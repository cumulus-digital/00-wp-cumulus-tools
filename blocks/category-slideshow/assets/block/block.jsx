import metadata from '../../block.json';

const { registerBlockType } = wp.blocks;
const { useBlockProps, BlockControls, InspectorControls } = wp.blockEditor;
const {
	Panel,
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarItem,
	DropdownMenu,
	TextControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	Button,
	IconButton,
	__experimentalUnitControl: UnitControl,
	Flex,
} = wp.components;
const ServerSideRender = wp.serverSideRender;
const { useState, useEffect } = wp.element;
const { useSelect } = wp.data;

registerBlockType( metadata.name, {
	...metadata,
	icon: {
		src: 'images-alt2',
		foreground: '#3399cc',
	},
	edit: ( props ) => {
		const blockProps = useBlockProps();
		const { attributes, setAttributes } = props;

		const { availableCategories } = useSelect( ( select ) => {
			return {
				availableCategories: select( 'core' ).getEntityRecords(
					'taxonomy',
					'category'
				),
			};
		} );

		useEffect(() => {
			if (
				window?.jQuery?.fn.crsgCategorySlideshow &&
				attributes.category
			) {
				window
					.jQuery( `#block-${ props.clientId }` )
					.crsgCategorySlideshow();
			}
		}, [ attributes ] );

		return (
			<div
				{ ...blockProps }
				data-category={ attributes.category }
				data-timeout={ attributes.timeout }
			>
				<InspectorControls>
					<PanelBody title="Slideshow Options">
						<SelectControl
							label="Media Category"
							value={ attributes.category }
							options={
								availableCategories?.length
									? availableCategories.map( ( cat ) => ( {
											label: cat.name,
											value: cat.id,
									  } ) )
									: { label: 'No categories available!' }
							}
							onChange={ ( val ) =>
								setAttributes( { category: val } )
							}
						/>
					</PanelBody>
					<PanelBody title="Timer">
						<h3>Seconds between slides</h3>
						<RangeControl
							value={ attributes.timeout }
							onChange={ ( val ) =>
								setAttributes( { timeout: val } )
							}
							min={ 0 }
							max={ 20 }
						/>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender block={metadata.name} attributes={attributes} />
			</div>
		);
	},
	/*
	save: ( props ) => {
		const blockProps = useBlockProps.save();
		const { attributes } = props;
		return (
			<div
				{ ...blockProps }
				data-category={ attributes.category }
				data-timeout={ attributes.timeout }
			></div>
		);
	},
	*/
} );
