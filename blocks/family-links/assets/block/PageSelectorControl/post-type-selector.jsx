import { useRef, useState, useEffect, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import { TreeSelect, Flex, Disabled, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

const PostTypeSelector = ( props ) => {
	const options = Object.assign(
		{
			selectedPostType: null,
			onChange: () => {},
			filter: false,
		},
		props
	);
	const { selectedPostType, onChange, filter: filterPostTypes } = options;
	const controller =
		typeof AbortController === 'undefined'
			? undefined
			: new AbortController();
	const [ isLoaded, setIsLoaded ] = useState( false );
	///const [ currentPostTypeDetails, setCurrentPostTypeDetails ] = useState();
	const [ allPostTypes, setAllPostTypes ] = useState();

	// Abort apiFetch requests on unmount
	useEffect( () => {
		return () => controller.abort();
	}, [] );

	const { currentPostType } = useSelect( ( select ) => {
		return {
			currentPostType: select( 'core/editor' ).getCurrentPostType(),
		};
	}, [] );

	useMemo( () => {
		setIsLoaded( false );
		const req = {
			path: addQueryArgs( '/wp/v2/types', { context: 'view' } ),
			signal: controller?.signal,
		};
		apiFetch( req ).then( ( types ) => setAllPostTypes( types ) );
		return req;
	}, [] );

	// Build options list from post type list
	const postTypeOptions = useMemo( () => {
		if ( ! allPostTypes ) {
			return;
		}
		let postTypes = Object.values( allPostTypes );
		if ( filterPostTypes ) {
			postTypes = postTypes?.filter( filterPostTypes );
		}
		const postTypeMap = postTypes?.map( ( pt ) => ( {
			id: pt.slug,
			name: decodeEntities( pt.name ),
		} ) );
		setIsLoaded( true );
		return postTypeMap;
	}, [ allPostTypes ] );

	// Auto-select post types in the following criteria
	useEffect( () => {
		if ( ! postTypeOptions?.length ) {
			return;
		}
		// If we only have one possible post type
		if ( postTypeOptions.length === 1 ) {
			onChange( postTypeOptions[ 0 ].id );
		}
		// If we don't already have a selection and the current
		// post type exists in the list
		if ( ! selectedPostType ) {
			const newPt = postTypeOptions.find(
				( o ) => o.id === currentPostType
			);
			if ( newPt?.id ) {
				onChange( newPt.id );
			}
		}
	}, [ postTypeOptions ] );

	const TreeSelector = ( props ) => {
		const resolvedProps = Object.assign(
			{
				label: 'Post Type',
				style: { lineHeight: 1.3 },
			},
			props
		);
		let WrapperEl = ( wrapperProps ) => wrapperProps.children;
		if ( ! allPostTypes || ! postTypeOptions ) {
			WrapperEl = Disabled;
			resolvedProps.noOptionLabel = 'None available';
		} else if ( postTypeOptions.length === 1 ) {
			return `Post type: ${ postTypeOptions[ 0 ].name }`;
		} else {
			Object.assign( resolvedProps, {
				selectedId: selectedPostType,
				onChange: onChange,
				tree: postTypeOptions,
			} );
		}
		return (
			<WrapperEl>
				<TreeSelect { ...resolvedProps } />
			</WrapperEl>
		);
	};

	return (
		<>
			{ ! isLoaded ? (
				<Flex direction="row" justify="left" align="center">
					<Spinner />
					Loading post types…
				</Flex>
			) : (
				<TreeSelector />
			) }
		</>
	);
};

export default PostTypeSelector;
