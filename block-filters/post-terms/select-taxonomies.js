/**
 * Add support for custom taxonomies to post-terms block
 * Automatically selects the appropriate term based on the
 * variation (categories => hierarchical, tags => not hierarchical))
 */
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Panel, PanelBody, SelectControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { useSelect } = wp.data;
const { useState, useEffect } = wp.element;

// Enable tax type selector on these blocks
const enableTaxTypeSelector = [ 'core/post-terms' ];

const withTaxTypeSelector = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's not our block
		if ( ! enableTaxTypeSelector.includes( props.name ) ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes, isSelected } = props;
		const { term } = attributes;
		const [ showInspector, setShowInspector ] = useState( false );
		const [ taxonomyOptions, setTaxonomyOptions ] = useState( [] );
		/*
		useEffect(() => {
			if (!attributes.postType) {
				setAttributes({
					postType: wp.data
						.select('core/editor')
						.getCurrentPostType(),
				});
			}
		});
		*/

		// Fill our taxonomies
		const { postType } = useSelect( ( select ) => {
			return { postType: select( 'core/editor' ).getCurrentPostType() };
		}, [] );
		const { availableTaxonomies, isLoading } = useSelect(
			( select ) => {
				const query = {
					type: postType,
					context: 'view',
					per_page: -1,
				};
				return {
					availableTaxonomies: select( 'core' ).getTaxonomies(
						query
					),
					isLoading: select( 'core/data' ).isResolving(
						'core',
						'getTaxonomies',
						query
					),
				};
			},
			[ postType ]
		);

		useEffect( () => {
			if ( ! availableTaxonomies ) {
				setTaxonomyOptions( [ { label: 'Loading...' } ] );
				return;
			}
			if ( ! availableTaxonomies.length ) {
				setTaxonomyOptions( [ { label: 'None available' } ] );
				return;
			}
			let hasTax = false;
			const newTaxes = availableTaxonomies.map( ( tax ) => {
				if ( tax.slug === term ) {
					hasTax = true;
				}
				return {
					label: tax.name,
					value: tax.slug,
				};
			} );
			if ( ! hasTax ) {
				let newTerm = null;
				if ( term === 'post_tag' ) {
					newTerm = availableTaxonomies.find(
						( tax ) => tax.hierarchical === false
					);
				}
				if ( term === 'category' ) {
					newTerm = availableTaxonomies.find(
						( tax ) => tax.hierarchical === true
					);
				}
				if ( newTerm ) {
					setAttributes( { term: newTerm.slug } );
				} else {
					setShowInspector( true );
					setAttributes( { term: newTaxes[ 0 ].value } );
				}
				newTaxes.unshift( {
					label: 'Select a taxonomy',
					value: null,
				} );
			} else {
				setShowInspector( false );
			}
			setTaxonomyOptions( newTaxes );
		}, [ availableTaxonomies ] );

		/**
		 * One day maybe this block will support changing post type...
		 */
		/*
		const { availablePostTypes } = useSelect((select) => {
			const types = select('core').getPostTypes();
			if (types && types.length) {
				const postTypes = types.filter((pt) => pt.viewable);
				if (postTypes && postTypes.length) {
					let hasType = false;
					const postTypeOptions = postTypes.map((pt) => {
						if (attributes.postType === pt.slug) {
							hasType = true;
						}
						return {
							label: pt.name,
							value: pt.slug,
						};
					});
					return {
						availablePostTypes: postTypeOptions,
					};
				}
			}
			return {
				availablePostTypes: [{ label: 'None available.' }],
			};
		}, []);
		*/

		return (
			<>
				{ isSelected && ! isLoading && (
					<InspectorControls>
						<Panel>
							<PanelBody
								title="Taxonomy"
								initialOpen={ showInspector }
							>
								<SelectControl
									label="Taxonomy Type"
									value={ term }
									options={ taxonomyOptions }
									onChange={ ( val ) =>
										setAttributes( { term: val } )
									}
									help="Only taxonomies associated with the current post type are available."
								/>
							</PanelBody>
						</Panel>
					</InspectorControls>
				) }
				<BlockEdit { ...props } />
			</>
		);
	};
}, 'withTaxTypeSelector' );

addFilter(
	'editor.BlockEdit',
	'cmls/block-extentions/post-types',
	withTaxTypeSelector
);
