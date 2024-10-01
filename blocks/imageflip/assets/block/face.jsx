import { validUnits, isEqual, hasBlockStyle, processStyles } from './common.js';
import metadata from '../../children.json';

/**
 * Wordpress dependencies
 */
const { registerBlockType } = wp.blocks;
const {
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarItem,
	Flex,
	Button,
	SelectControl,
	FocalPointPicker,
	RangeControl,
	__experimentalBoxControl: BoxControl,
	__experimentalUnitControl: UnitControl,
	ColorPicker,
} = wp.components;
const {
	InspectorControls,
	BlockControls,
	__experimentalBlockAlignmentMatrixControl: BlockAlignmentMatrixControl,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	MediaUpload,
	MediaUploadCheck,
	ColorPaletteControl,
} = wp.blockEditor;
const { useState } = wp.element;
const { withState } = wp.compose;

const POSITION_CLASSNAMES = {
	'top left': 'is-position-top-left',
	'top center': 'is-position-top-center',
	'top right': 'is-position-top-right',
	'center left': 'is-position-center-left',
	'center center': 'is-position-center-center',
	center: 'is-position-center-center',
	'center right': 'is-position-center-right',
	'bottom left': 'is-position-bottom-left',
	'bottom center': 'is-position-bottom-center',
	'bottom right': 'is-position-bottom-right',
};
const getPositionClassName = ( pos ) => {
	if ( ! pos || pos === 'center' || pos === 'center center' ) {
		return '';
	}
	return POSITION_CLASSNAMES[ pos ];
};

registerBlockType( metadata.name, {
	...metadata,
	icon: {
		src: 'format-gallery',
		foreground: '#3399cc',
	},
	edit: ( props ) => {
		const { attributes, context, setAttributes } = props;

		// Set border radius from parent context if it's changed
		if (
			! isEqual(
				context[ 'cumulus-flipcard/borderRadius' ],
				attributes.borderRadius
			)
		) {
			setAttributes( {
				borderRadius: context[ 'cumulus-flipcard/borderRadius' ],
			} );
		}

		const customPosition = getPositionClassName(
			attributes.contentPosition
		);
		const customClasses = [
			'crsg-flipcard-face-container',
			`crsg-flipcard-face-${ attributes.face }`,
		];
		if ( customPosition ) {
			customClasses.push( [
				'has-custom-content-position',
				customPosition,
			] );
		}

		const blockProps = useBlockProps( {
			className: customClasses.join( ' ' ),
			style: processStyles( attributes ),
		} );

		const innerBlockProps = useInnerBlocksProps(
			{
				className: 'crsg-flipcard-face',
			},
			{
				renderAppender: InnerBlocks.ButtonBlockAppender,
				//template: [ [ 'core/paragraph', {}, [] ] ],
				templateLock: false,
			}
		);

		const updateStyle = ( style ) => {
			const styles = {
				...attributes.style,
				...style,
			};
			setAttributes( { style: styles } );
		};

		return (
			<div { ...blockProps }>
				<BlockControls group="block">
					<ToolbarGroup>
						<BlockAlignmentMatrixControl
							label="Set content container alignment"
							value={ attributes.contentPosition }
							onChange={ ( val ) =>
								setAttributes( {
									contentPosition: val,
								} )
							}
						/>
					</ToolbarGroup>
					<ToolbarGroup>
						<ToolbarItem
							as={ Flex }
							style={ {
								paddingLeft: '1em',
								paddingRight: '1em',
							} }
						>
							{ attributes.face.toUpperCase() }
						</ToolbarItem>
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls>
					<PanelBody
						title="Background Image"
						initialOpen={ attributes.backgroundImage }
					>
						<PanelRow>
							<MediaUploadCheck>
								<MediaUpload
									label="Background Image"
									type="image"
									value={ attributes.backgroundImage }
									render={ ( { open } ) => {
										return (
											<Flex
												style={ {
													gap: '5px',
													justifyContent:
														'flex-start',
													marginBottom: '5px',
												} }
											>
												<Button
													className="button button-large"
													onClick={ open }
												>
													{ attributes.backgroundImage
														? `Replace Image`
														: `Choose Image` }
												</Button>
												{ attributes.backgroundImage && (
													<Button
														className="button button-large"
														onClick={ () => {
															setAttributes( {
																backgroundImage:
																	undefined,
																backgroundImageThumb:
																	undefined,
															} );
														} }
													>
														Remove
													</Button>
												) }
											</Flex>
										);
									} }
									onSelect={ ( media ) => {
										setAttributes( {
											backgroundImage:
												media.sizes.full.url,
											backgroundImageThumb:
												media.sizes.thumbnail.url,
										} );
									} }
								/>
							</MediaUploadCheck>
						</PanelRow>
						{ attributes.backgroundImage && (
							<>
								<FocalPointPicker
									url={ attributes.backgroundImage }
									value={ attributes.backgroundPosition }
									onChange={ ( val ) => {
										setAttributes( {
											backgroundPosition: val,
										} );
									} }
								/>
								<SelectControl
									label="Repeat"
									value={ attributes.style.backgroundRepeat }
									options={ [
										{
											label: 'None',
											value: 'no-repeat',
										},
										{
											label: 'Repeat',
											value: 'repeat',
										},
										{
											label: 'Horizontal Only',
											value: 'repeat-x',
										},
										{
											label: 'Vertical Only',
											value: 'repeat-y',
										},
									] }
									onChange={ ( repeat ) =>
										updateStyle( {
											backgroundRepeat: repeat,
										} )
									}
								/>
								<SelectControl
									label="Sizing Method"
									value={ attributes.backgroundSizing }
									options={ [
										{ label: 'Cover', value: 'cover' },
										{ label: 'Contain', value: 'contain' },
										{ label: 'Percent', value: 'percent' },
									] }
									onChange={ ( size ) => {
										setAttributes( {
											backgroundSizing: size,
										} );
									} }
								/>
							</>
						) }
						{ attributes.backgroundSizing === 'percent' && (
							<PanelRow>
								<RangeControl
									label="Percentage Sizing"
									value={ attributes.backgroundSizingPercent }
									initialPosition={
										attributes.backgroundSizingPercent
									}
									resetFallbackValue={ 100 }
									onChange={ ( value ) => {
										setAttributes( {
											backgroundSizingPercent: value,
										} );
										updateStyle(
											processStyles( attributes )
										);
									} }
									min={ 0 }
									max={ 200 }
								/>
							</PanelRow>
						) }
					</PanelBody>
					<PanelBody
						title="Padding"
						initialOpen={ hasBlockStyle( attributes.padding ) }
					>
						<BoxControl
							values={ attributes.padding }
							onChange={ ( val ) => {
								const newVal = {
									...attributes.padding,
									top: val.top,
									right: val.right,
									bottom: val.bottom,
									left: val.left,
								};
								setAttributes( { padding: newVal } );
							} }
						/>
					</PanelBody>
					<PanelBody
						title="Border"
						initialOpen={ hasBlockStyle( attributes.borderWidth ) }
					>
						<BoxControl
							label="Border width"
							values={ attributes.borderWidth }
							onChange={ ( val ) => {
								const newVal = {
									...attributes.borderWidth,
									top: val.top,
									right: val.right,
									bottom: val.bottom,
									left: val.left,
								};
								setAttributes( { borderWidth: newVal } );
							} }
						/>
						<ColorPaletteControl
							label="Border color"
							value={ attributes.borderColor }
							onChange={ ( val ) =>
								setAttributes( { borderColor: val } )
							}
						/>
						<div>
							<strong>Note:</strong>
							Border radius for the entire card is set from the
							parent card container.
						</div>
					</PanelBody>
					<PanelBody
						title="Shadow"
						initialOpen={ attributes.shadowColor }
					>
						<PanelRow title="Shadow">
							<Flex>
								<UnitControl
									label="Offset X"
									size="small"
									units={ validUnits }
									value={ attributes.shadowOffsetX }
									onChange={ ( val ) =>
										setAttributes( { shadowOffsetX: val } )
									}
								/>
								<UnitControl
									label="Offset Y"
									size="small"
									units={ validUnits }
									value={ attributes.shadowOffsetY }
									onChange={ ( val ) =>
										setAttributes( { shadowOffsetY: val } )
									}
								/>
								<UnitControl
									label="Radius"
									size="small"
									units={ validUnits }
									value={ attributes.shadowRadius }
									onChange={ ( val ) =>
										setAttributes( { shadowRadius: val } )
									}
								/>
							</Flex>
						</PanelRow>
						<PanelRow>
							<ColorPicker
								label="Shadow color"
								color={ attributes.shadowColor }
								onChangeComplete={ ( val ) => {
									setAttributes( {
										shadowColor: val.color.toRgbString(),
									} );
								} }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div { ...innerBlockProps }>{ innerBlockProps.children }</div>
			</div>
		);
	},

	save: ( props ) => {
		const { attributes } = props;
		const customPosition = getPositionClassName(
			attributes.contentPosition
		);
		const customClasses = [
			'crsg-flipcard-face-container',
			`crsg-flipcard-face-${ attributes.face }`,
		];
		if ( customPosition ) {
			customClasses.push( [
				'has-custom-content-position',
				customPosition,
			] );
		}
		const blockProps = useBlockProps.save( {
			className: customClasses.join( ' ' ),
			style: processStyles( attributes ),
		} );

		return (
			<div { ...blockProps }>
				<div className="crsg-flipcard-face">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
