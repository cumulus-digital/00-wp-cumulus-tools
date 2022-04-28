import { useState, useEffect, useMemo } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { TreeSelect, Flex, Spinner, Disabled } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

function getTitle( post ) {
	return post?.title?.rendered
		? decodeEntities( post.title.rendered )
		: `#${ post.id } (${ 'n' })`;
}

// based on:
// https://github.com/WordPress/gutenberg/blob/a7e2895829c16ecd77a5ba22d84f1dee1cfb0977/packages/editor/src/utils/terms.js
function buildTermsTree( flatTerms ) {
	const flatTermsWithParentAndChildren = flatTerms.map( ( term ) => {
		return {
			children: [],
			parent: null,
			...term,
		};
	} );

	const termsByParent = flatTermsWithParentAndChildren.reduce(
		( acc, value ) => {
			// Group initialization
			if ( ! acc[ value.parent ] ) {
				acc[ value.parent ] = [];
			}

			// Grouping
			acc[ value.parent ].push( value );
			return acc;
		},
		{}
	);

	if ( termsByParent.null && termsByParent.null.length ) {
		return flatTermsWithParentAndChildren;
	}

	const fillWithChildren = ( terms ) => {
		return terms.map( ( term ) => {
			const children = termsByParent[ term.id ];
			return {
				...term,
				children:
					children && children.length
						? fillWithChildren( children )
						: [],
			};
		} );
	};
	if ( termsByParent[ '0' ] ) {
		return fillWithChildren( termsByParent[ '0' ] );
	}
	if ( Object.values( termsByParent ).length ) {
		return fillWithChildren( Object.values( termsByParent )[ 0 ] );
	}
	return [];
}

const ChildPageSelector = ( props ) => {
	const options = Object.assign(
		{
			label: '',
			help: '',
			noOptionLabel: null,
			postType: 'page',
			parentPostId: null,
			selectedId: null,
			onChange: () => {},
			onLoad: () => {},
			multiple: false,
			style: {},
		},
		props
	);
	const { postType, parentPostId, selectedId, multiple } = options;
	let { onChange: onChangeCB, onLoad: onLoadCB } = options;

	if ( ! postType ) {
		return <></>;
	}

	const controller =
		typeof AbortController === 'undefined'
			? undefined
			: new AbortController();
	const aborted = controller?.signal?.aborted;

	const isAlive = () => {
		return ! aborted;
	};
	const [ isLoaded, setIsLoaded ] = useState( false );
	const [ selectedPostType, setSelectedPostType ] = useState();
	const [ childPageList, setChildPageList ] = useState();

	// Abort apiFetch requests on unmount
	useEffect( () => {
		return () => controller.abort();
	}, [] );

	// Fetch info about the selected post type
	useMemo( () => {
		const req = {
			path: addQueryArgs( `/wp/v2/types/${ postType }`, {
				context: 'view',
			} ),
			signal: controller?.signal,
		};
		if ( postType ) {
			setIsLoaded( false );
			apiFetch( req ).then( ( type ) => {
				if ( type.hierarchical ) {
					setSelectedPostType( type );
				}
			} );
		}
		return req;
	}, [ postType ] );

	// Fetch child posts
	useMemo( () => {
		if ( selectedPostType ) {
			const query = {
				type: selectedPostType?.slug,
				per_page: -1,
				//orderby: 'menu_order,title',
				//order: 'asc',
				_fields: 'id,title,parent',
				context: 'view',
			};
			const req = {
				path: addQueryArgs(
					//parentPostId
					//	? `/cumulus-gutenberg-family-links/v1/children-of/${ parentPostId }`
					//	: `/${ selectedPostType?.rest_namespace }/${ selectedPostType?.rest_base }`,
					`/cumulus-gutenberg-family-links/v1/children-of/${
						parentPostId || 0
					}`,
					query
				),
				signal: controller?.signal,
			};
			setIsLoaded( false );
			apiFetch( req ).then( ( pages ) => {
				setChildPageList( pages );
			} );
		}
	}, [ selectedPostType, parentPostId ] );

	// Generate an options list from the page list
	const { childPageOptions } = useMemo( () => {
		let tree;
		if ( childPageList?.length ) {
			tree = buildTermsTree(
				childPageList
					?.map( ( item ) => {
						if ( ! item?.id ) {
							return;
						}
						return {
							id: item.id,
							parent: item.parent,
							name: getTitle( item ),
						};
					} )
					.filter( Boolean )
			);
			setIsLoaded( true );
		}
		return {
			childPageOptions: tree,
		};
	}, [ childPageList ] );

	useEffect( () => {
		onLoadCB( childPageOptions );
	}, [ childPageOptions ] );

	const TreeSelector = ( props ) => {
		const style = Object.assign(
			options.multiple && childPageOptions?.length
				? {
						height: 'auto',
						minHeight: '6em',
						padding: '8px',
				  }
				: {},
			options.style
		);
		let noOptionsLabel =
			options.noOptionLabel ||
			`No ${
				selectedPostType?.labels?.singular_name || 'page'
			} selected`;
		if ( options.noOptionLabel === false ) {
			noOptionsLabel = null;
		}
		const resolvedProps = Object.assign(
			{
				label:
					options.label ||
					`Select a ${
						selectedPostType?.labels?.singular_name || 'page'
					}`,
				help: options?.help,
				//noOptionLabel: noOptionsLabel,
				className: 'editor-page-attributes__parent',
				style: { lineHeight: 1.3 },
				multiple: options.multiple,
				style: style,
			},
			props
		);
		let WrapperEl = ( wrapperProps ) => wrapperProps.children;

		if ( ! childPageOptions?.length ) {
			WrapperEl = Disabled;
			resolvedProps.noOptionLabel = 'None available';
		} else {
			Object.assign( resolvedProps, {
				selectedId: selectedId,
				tree: [
					{
						id: 0,
						name: 'None',
					},
					...childPageOptions,
				],
				onChange: onChangeCB,
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
					{ `Loading ${
						selectedPostType?.labels?.plural_name || 'pages'
					}…` }
				</Flex>
			) : (
				<TreeSelector />
			) }
		</>
	);
};
export default ChildPageSelector;
