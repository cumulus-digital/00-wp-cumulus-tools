/**
 * Rewrite of ServerSideRender component to support onChange
 * and keeping existing content in place while loading new.
 */

/**
 * External dependencies
 */
import { isEqual, reduce } from 'lodash';

/**
 * WordPress dependencies
 */
const { useDebounce, usePrevious } = wp.compose;
const { RawHTML, useEffect, useRef, useState, useCallback } = wp.element;
const { __, sprintf } = wp.i18n;
const apiFetch = wp.apiFetch;
const { addQueryArgs } = wp.url;
const { Placeholder, Spinner } = wp.components;
const { getBlockType } = wp.blocks;

export function sanitizeBlockAttributes( name, attributes ) {
	// Get the type definition associated with a registered block.
	const blockType = getBlockType( name );

	if ( undefined === blockType ) {
		throw new Error( `Block type '${ name }' is not registered.` );
	}

	return reduce(
		blockType.attributes,
		( accumulator, schema, key ) => {
			const value = attributes[ key ];

			if ( undefined !== value ) {
				accumulator[ key ] = value;
			} else if ( schema.hasOwnProperty( 'default' ) ) {
				accumulator[ key ] = schema.default;
			}

			if ( [ 'node', 'children' ].indexOf( schema.source ) !== -1 ) {
				// Ensure value passed is always an array, which we're expecting in
				// the RichText component to handle the deprecated value.
				if ( typeof accumulator[ key ] === 'string' ) {
					accumulator[ key ] = [ accumulator[ key ] ];
				} else if ( ! Array.isArray( accumulator[ key ] ) ) {
					accumulator[ key ] = [];
				}
			}

			return accumulator;
		},
		{}
	);
}

export function rendererPath( block, attributes = null, urlQueryArgs = {} ) {
	return addQueryArgs( `/wp/v2/block-renderer/${ block }`, {
		context: 'edit',
		...( null !== attributes ? { attributes } : {} ),
		...urlQueryArgs,
	} );
}

function DefaultEmptyResponsePlaceholder( { className } ) {
	return (
		<Placeholder className={ className }>
			{ __( 'Block rendered as empty.' ) }
		</Placeholder>
	);
}

function DefaultErrorResponsePlaceholder( { response, className } ) {
	const errorMessage = sprintf(
		// translators: %s: error message describing the problem
		__( 'Error loading block: %s' ),
		response.errorMsg
	);
	return <Placeholder className={ className }>{ errorMessage }</Placeholder>;
}

export default function CmlsServerSideRender( props ) {
	const {
		attributes,
		block,
		className,
		httpMethod = 'GET',
		urlQueryArgs,
		onChange,
		onError,
		EmptyResponsePlaceholder = DefaultEmptyResponsePlaceholder,
		ErrorResponsePlaceholder = DefaultErrorResponsePlaceholder,
	} = props;

	const isMountedRef = useRef( true );
	const fetchRequestRef = useRef();
	const [ response, setResponse ] = useState( null );
	const [ prevResponse, setPrevResponse ] = useState( null );
	const [ isLoading, setIsLoading ] = useState( false );
	const prevProps = usePrevious( props );

	const fetchData = useCallback( () => {
		if ( ! isMountedRef.current ) {
			return;
		}
		if ( null !== response ) {
			setPrevResponse( response );
			setResponse( null );
		}

		const sanitizedAttributes =
			attributes && sanitizeBlockAttributes( block, attributes );

		// If httpMethod is 'POST', send the attributes in the request body instead of the URL.
		// This allows sending a larger attributes object than in a GET request, where the attributes are in the URL.
		const isPostRequest = 'POST' === httpMethod;
		const urlAttributes = isPostRequest
			? null
			: sanitizedAttributes ?? null;
		const path = rendererPath( block, urlAttributes, urlQueryArgs );
		const data = isPostRequest
			? { attributes: sanitizedAttributes ?? null }
			: null;

		const isOurRequest = ( req ) => {
			return isMountedRef.current && req === fetchRequestRef.current;
		};

		// Store the latest fetch request so that when we process it, we can
		// check if it is the current request, to avoid race conditions on slow networks.
		setIsLoading( true );
		const fetchRequest = ( fetchRequestRef.current = apiFetch( {
			path,
			data,
			method: isPostRequest ? 'POST' : 'GET',
		} )
			.then( ( fetchResponse ) => {
				if ( isOurRequest && fetchResponse ) {
					setResponse( fetchResponse.rendered );
				}
			} )
			.then( () => {
				if ( onChange ) {
					onChange();
				}
			} )
			.finally( () => {
				setIsLoading( false );
			} )
			.catch( ( error ) => {
				if ( isOurRequest ) {
					setResponse( {
						error: true,
						errorMsg: error.message,
					} );
					if ( onError ) {
						onError( error );
					}
				}
			} ) );

		return fetchRequest;
	} );

	const debouncedFetchData = useDebounce( fetchData, 100, {
		leading: true,
		trailing: true,
	} );

	// When the component unmounts, set isMountedRef to false. This will
	// let the async fetch callbacks know when to stop.
	useEffect(
		() => () => {
			isMountedRef.current = false;
		},
		[]
	);

	useEffect( () => {
		// Don't debounce the first fetch. This ensures that the first render
		// shows data as soon as possible
		if ( prevProps === undefined ) {
			fetchData();
		} else if ( ! isEqual( prevProps.attributes, props.attributes ) ) {
			debouncedFetchData();
		}
	}, [ props.attributes ] );

	const MySpinner = props.LoadingResponsePlaceholder ? (
		props.LoadingResponsePlaceholder
	) : (
		<Spinner />
	);

	if ( response === '' ) {
		return <EmptyResponsePlaceholder { ...props } />;
	} else if ( ! response || isLoading ) {
		if ( ! prevResponse ) {
			return <MySpinner />;
		}
		return (
			<div style={ { position: 'relative' } }>
				<div
					style={ {
						position: 'absolute',
						top: 0,
						right: 0,
					} }
				>
					<Spinner />
				</div>
				<RawHTML className={ className }>{ prevResponse }</RawHTML>
			</div>
		);
	} else if ( response.error ) {
		return <ErrorResponsePlaceholder response={ response } { ...props } />;
	}

	return <RawHTML className={ className }>{ response }</RawHTML>;
}
