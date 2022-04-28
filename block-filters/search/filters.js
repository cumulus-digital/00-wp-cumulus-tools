/**
 * Add base path, post type, and taxonomy filters to core search block
 */
import TaxonomyControls from 'wpBlockLibrary/src/query/edit/inspector-controls/taxonomy-controls';
import { usePostTypes } from 'wpBlockLibrary/src/query/utils';

const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Panel, PanelBody, SelectControl } = wp.components;
const { InspectorControls } = wp.blockEditor;
const { useState, useEffect } = wp.element;
const { useSelect } = wp.data;

const addAttributesToSearch = ( settings, name ) => {
	if ( name !== 'core/search' ) {
		return settings;
	}
	const newSettings = {
		baseCategory: {
			type: 'string',
		},
		query: {
			type: 'object',
			default: {
				postType: null,
				author: '',
				exclude: [],
				sticky: '',
				taxQuery: null,
			},
		},
	};
	settings.attributes = {
		...settings?.attributes,
		...newSettings,
	};
	return settings;
};
addFilter(
	'blocks.registerBlockType',
	'cmls/block-filters/search/filters',
	addAttributesToSearch
);

/**
 * Inspector controls
 */
const withTaxTypeSelector = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's not our block
		if ( props.name !== 'core/search' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes, isSelected } = props;
		const [ postTypesSelectOptions, setPostTypesSelectOptions ] = useState(
			[]
		);
		const [
			postCategoriesSelectOptions,
			setPostCategoriesSelectOptions,
		] = useState( [] );

		const setQuery = ( newQuery ) =>
			setAttributes( { query: { ...attributes.query, ...newQuery } } );

		const {
			postTypesTaxonomiesMap,
			postTypesSelectOptions: availablePostTypes,
		} = usePostTypes();
		useEffect( () => {
			setPostTypesSelectOptions( [
				{
					value: '',
					label: 'None',
				},
				...availablePostTypes,
			] );
		}, [ availablePostTypes ] );

		const onPostTypeChange = ( newValue ) => {
			const updateQuery = { postType: newValue };
			// We need to dynamically update the `taxQuery` property,
			// by removing any not supported taxonomy from the query.
			const supportedTaxonomies = postTypesTaxonomiesMap[ newValue ];
			const updatedTaxQuery = Object.entries(
				attributes?.query?.taxQuery || {}
			).reduce( ( accumulator, [ taxonomySlug, terms ] ) => {
				if (
					supportedTaxonomies &&
					supportedTaxonomies.includes( taxonomySlug )
				) {
					accumulator[ taxonomySlug ] = terms;
				}
				return accumulator;
			}, {} );
			updateQuery.taxQuery = !! Object.keys( updatedTaxQuery ).length
				? updatedTaxQuery
				: undefined;

			updateQuery.sticky = '';
			setAttributes( { baseCategory: '' } );
			setQuery( updateQuery );
		};

		const { postCategories, postCategoriesLoading } = useSelect(
			( select ) => {
				if ( attributes?.query?.postType !== 'post' ) {
					return [];
				}
				return {
					postCategories: select( 'core' ).getEntityRecords(
						'taxonomy',
						'category',
						{
							per_page: -1,
						}
					),
					postCategoriesLoading: select(
						'core/data'
					).isResolving( 'core', 'getEntityRecords', [
						'taxonomy',
						'category',
						{ per_page: -1 },
					] ),
				};
			},
			[ attributes.query, attributes.baseCategory ]
		);
		useEffect( () => {
			const noneAvailable = [
				{
					label: 'None available',
					value: '',
				},
			];
			if ( postCategoriesLoading ) {
				setPostCategoriesSelectOptions( [
					{
						value: '',
						label: 'Loading categories…',
					},
				] );
			} else if ( ! postCategories ) {
				setPostCategoriesSelectOptions( noneAvailable );
			} else {
				const options = postCategories.map( ( term ) => {
					return { value: term.slug, label: term.name };
				} );
				setPostCategoriesSelectOptions( [
					{
						value: '',
						label: 'None',
					},
					...options,
				] );
			}
		}, [ postCategories, postCategoriesLoading ] );

		return (
			<>
				{ isSelected && (
					<InspectorControls>
						<Panel>
							<PanelBody title="Filters" initialOpen={ true }>
								<p>
									Restrict searches to a simple post category,
									or a more complex filter with other post
									types and taxonomy terms.
								</p>
								<SelectControl
									label="Post Type"
									value={ attributes?.query?.postType || '' }
									options={ postTypesSelectOptions }
									onChange={ onPostTypeChange }
								/>
								{ attributes?.query?.postType === 'post' && (
									<SelectControl
										label="Base Category"
										help="Searches can be restricted to a single Post category with a friendly URL."
										value={ attributes.baseCategory }
										options={ postCategoriesSelectOptions }
										onChange={ ( val ) =>
											setAttributes( {
												baseCategory: val,
											} )
										}
									/>
								) }
								{ ! attributes.baseCategory && (
									<>
										{ attributes?.query?.postType && (
											<TaxonomyControls
												query={ attributes?.query }
												onChange={ setQuery }
											/>
										) }
									</>
								) }
							</PanelBody>
						</Panel>
					</InspectorControls>
				) }
				<BlockEdit { ...props } />
			</>
		);
	};
} );
addFilter(
	'editor.BlockEdit',
	'cmls/block-filters/search/filters',
	withTaxTypeSelector
);
