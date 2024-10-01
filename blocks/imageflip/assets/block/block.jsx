import { validUnits, isEqual } from './common.js';
import metadata from '../../block.json';
import './face.jsx';

const { registerBlockType } = wp.blocks;
const {
	Panel,
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarItem,
	DropdownMenu,
	TextControl,
	ToggleControl,
	SelectControl,
	Button,
	IconButton,
	__experimentalUnitControl: UnitControl,
	Flex,
} = wp.components;
const {
	InspectorControls,
	BlockControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalLinkControl: LinkControl,
} = wp.blockEditor;
const { useState } = wp.element;

registerBlockType( metadata.name, {
	...metadata,
	icon: {
		src: 'format-gallery',
		foreground: '#3399cc',
	},
	edit: ( props ) => {
		const [ showFront, setShowFront ] = useState( true );
		const { attributes, setAttributes, setState } = props;

		const customClasses = [
			'crsg-flipcard',
			`crsg-flipcard-${ attributes.flipDirection }`,
			`show-face-${ showFront ? 'front' : 'back' }`,
		];
		const blockProps = useBlockProps( {
			className: customClasses.join( ' ' ),
		} );

		const innerBlockProps = useInnerBlocksProps(
			{
				className: 'crsg-flipcard-container',
				title: 'CardFlip Container',
			},
			{
				template: [
					[
						'cumulus-gutenberg/imageflip-face',
						{ face: 'front' },
						[],
					],
					[
						'cumulus-gutenberg/imageflip-face',
						{ face: 'back' },
						[],
					],
				],
				templateLock: 'insert',
			}
		);

		return (
			<div { ...blockProps }>
				<BlockControls group="block">
					<ToolbarGroup>
						<ToolbarItem>
							{ ( itemProps ) => (
								<DropdownMenu
									toggleProps={ itemProps }
									icon={ `image-flip-${ attributes.flipDirection }` }
									label="Change flip direction"
									text={
										attributes.flipDirection
											.charAt( 0 )
											.toUpperCase() +
										attributes.flipDirection.slice( 1 )
									}
									controls={ [
										{
											icon: 'image-flip-horizontal',
											title: 'Horizontal',
											isActive:
												attributes.flipDirection ===
												'horizontal',
											onClick: () =>
												setAttributes( {
													flipDirection: 'horizontal',
												} ),
										},
										{
											icon: 'image-flip-vertical',
											title: 'Vertical',
											isActive:
												attributes.flipDirection ===
												'vertical',
											onClick: () =>
												setAttributes( {
													flipDirection: 'vertical',
												} ),
										},
									] }
								/>
							) }
						</ToolbarItem>
					</ToolbarGroup>
					<ToolbarGroup>
						<ToolbarItem
							as={ IconButton }
							icon="randomize"
							title="Flip the card face"
							onClick={ () => setShowFront( ! showFront ) }
						>
							Viewing: { showFront ? 'FRONT' : 'BACK' }
						</ToolbarItem>
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls>
					<Panel>
						<PanelBody title="Link">
							<LinkControl
								label="Link the card"
								value={ {
									url: attributes.linkUrl,
									opensInNewTab:
										attributes.linkTarget === '_blank',
								} }
								onChange={ ( val ) => {
									if ( ! val ) {
										val = undefined;
									}
									const linkAttr = {
										linkUrl: val.url,
										linkTitle:
											val.title === val.url
												? attributes.linkTitle
												: val.title,
										linkTarget: val.opensInNewTab
											? '_blank'
											: undefined,
										linkRel: val.opensInNewTab
											? 'noopener'
											: undefined,
									};

									setAttributes( linkAttr );
								} }
							/>
							<TextControl
								label="Link Title"
								value={ attributes.linkTitle || undefined }
								onChange={ ( val ) => {
									setAttributes( { linkTitle: val } );
								} }
							/>
							{ attributes.linkUrl && (
								<Button
									className="button button-large"
									onClick={ () => {
										setAttributes( {
											linkUrl:
												metadata.attributes.linkUrl
													.default,
											linkTarget:
												metadata.attributes.linkTarget
													.default,
											linkTitle:
												metadata.attributes.linkTitle
													.default,
											linkRel:
												metadata.attributes.linkRel
													.default,
										} );
									} }
								>
									Unlink Card
								</Button>
							) }
						</PanelBody>
						<PanelBody title="Flip Effect" initialOpen={ false }>
							<SelectControl
								label="Direction"
								value={ attributes.flipDirection }
								onChange={ ( val ) =>
									setAttributes( {
										flipDirection: val,
									} )
								}
								options={ [
									{
										value: 'horizontal',
										label: 'Horizontal',
									},
									{
										value: 'vertical',
										label: 'Vertical',
									},
								] }
							/>
							<ToggleControl
								label="Zoom"
								checked={ attributes.zoomOnHover }
								onChange={ ( val ) => {
									setAttributes( { zoomOnHover: val } );
								} }
							/>
						</PanelBody>
						<PanelBody
							title="Border Radius"
							initialOpen={
								! isEqual(
									attributes.childBorderRadius,
									metadata.attributes.childBorderRadius
										.default
								)
							}
						>
							<PanelRow>
								<Flex>
									<UnitControl
										label="TL ┏"
										size="small"
										units={ validUnits }
										value={
											attributes.childBorderRadius.topLeft
										}
										onChange={ ( val ) => {
											const newVal = {
												...attributes.childBorderRadius,
												topLeft: val,
											};
											setAttributes( {
												childBorderRadius: newVal,
											} );
										} }
									/>
									<UnitControl
										label="TR ┓"
										size="small"
										units={ validUnits }
										value={
											attributes.childBorderRadius
												.topRight
										}
										onChange={ ( val ) => {
											const newVal = {
												...attributes.childBorderRadius,
												topRight: val,
											};
											setAttributes( {
												childBorderRadius: newVal,
											} );
										} }
									/>
									<UnitControl
										label="BR ┛"
										size="small"
										units={ validUnits }
										value={
											attributes.childBorderRadius
												.bottomRight
										}
										onChange={ ( val ) => {
											const newVal = {
												...attributes.childBorderRadius,
												bottomRight: val,
											};
											setAttributes( {
												childBorderRadius: newVal,
											} );
										} }
									/>
									<UnitControl
										label="BL ┗"
										size="small"
										units={ validUnits }
										value={
											attributes.childBorderRadius
												.bottomLeft
										}
										onChange={ ( val ) => {
											const newVal = {
												...attributes.childBorderRadius,
												bottomLeft: val,
											};
											setAttributes( {
												childBorderRadius: newVal,
											} );
										} }
									/>
								</Flex>
							</PanelRow>
							<PanelRow>
								{ ! isEqual(
									attributes.childBorderRadius,
									metadata.attributes.childBorderRadius
										.default
								) && (
									<Button
										className="button button-small"
										onClick={ () => {
											setAttributes( {
												childBorderRadius:
													metadata.attributes
														.childBorderRadius
														.default,
											} );
										} }
									>
										Reset
									</Button>
								) }
							</PanelRow>
						</PanelBody>
					</Panel>
				</InspectorControls>

				<div { ...innerBlockProps }>{ innerBlockProps.children }</div>
			</div>
		);
	},
	save: ( props ) => {
		const { attributes } = props;

		const customClasses = [
			'crsg-flipcard',
			`crsg-flipcard-${ attributes.flipDirection }`,
		];
		if ( attributes.zoomOnHover ) {
			customClasses.push( 'has-zoom-on-hover' );
		}

		let linkAttributes = {};
		if ( attributes.linkUrl ) {
			linkAttributes = {
				href: attributes.linkUrl,
				target: attributes.linkTarget,
				title: attributes.linkTitle,
				rel: attributes.linkRel,
			};
		}

		const blockProps = useBlockProps.save( {
			className: customClasses.join( ' ' ),
			...linkAttributes,
		} );

		const WrapperEl = ( elProps ) => {
			if ( elProps.isLink ) {
				return <a { ...elProps }>{ elProps.children }</a>;
			}
			return <div { ...elProps }>{ elProps.children }</div>;
		};

		return (
			<WrapperEl
				isLink={ attributes.linkUrl && attributes.linkUrl.length > 0 }
				{ ...blockProps }
			>
				<div className="crsg-flipcard-container">
					<InnerBlocks.Content />
				</div>
			</WrapperEl>
		);
	},
} );
