//import CumulusIcon from '../../../../global/icons/Cumulus.jsx';
import GroupIcon from './icon.jsx';
import metadata from '../../block.json';
import './group-header.jsx';
import './group-body.jsx';
import { generateId } from 'Utilities/shortrandom.js';
import ColorControl from 'Components/ColorControl';
import PanelRow from 'Components/PanelRow';

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	ExternalLink,
} from '@wordpress/components';
import { useEffect, useState, Platform } from '@wordpress/element';

const generateStyles = ( attributes ) => {
	const cssStyles = {
		// Store our padding as css variables so we can use it for the mobile header.
		'--padding-top': attributes?.style?.spacing?.padding?.top,
		'--padding-right': attributes?.style?.spacing?.padding?.right,
		'--padding-bottom': attributes?.style?.spacing?.padding?.bottom,
		'--padding-left': attributes?.style?.spacing?.padding?.left,
		'--separator-color': attributes?.separatorColor,
		'--collapse-width': attributes?.collapseWidth,
	};
	// WP uses a class for border color which causes FOUC
	if ( attributes.borderColor ) {
		cssStyles.borderColor = attributes.borderColor;
	}
	if ( attributes.hasStickyPosition ) {
		Object.assign( cssStyles, {
			'--sticky-position': attributes?.stickyPosition,
			'--sticky-zindex': attributes?.stickyZIndex,
		} );
	}
	if ( attributes.mobileExpandIconColor ) {
		cssStyles[ '--mobile-expand-icon-color' ] =
			attributes?.mobileExpandIconColor;
	}
	return Object.keys( cssStyles )
		.filter(
			( key ) => cssStyles[ key ] != null && cssStyles[ key ] != undefined
		)
		.reduce(
			( a, key ) => ( {
				...a,
				[ key ]: cssStyles[ key ],
			} ),
			{}
		);
	return cssStyles;
};
const generateDataAttributes = ( attributes ) => {
	const dataAttributes = {};
	if ( attributes?.hasStickyPosition ) {
		//dataAttributes[ 'sticky-position' ] = attributes?.stickyPosition;
		dataAttributes[ 'sticky-desktop-container' ] =
			attributes?.stickyDesktopContainer;
		dataAttributes[ 'sticky-mobile-container' ] =
			attributes?.stickyMobileContainer;
		//dataAttributes[ 'sticky-zindex' ] = attributes?.stickyZIndex;
	}
	return Object.keys( dataAttributes )
		.filter(
			( key ) =>
				dataAttributes[ key ] != null &&
				dataAttributes[ key ] != undefined
		)
		.reduce(
			( a, key ) => ( {
				...a,
				[ `data-${ key }` ]: dataAttributes[ key ],
			} ),
			{}
		);
};
const generateClassNames = ( attributes ) => {
	const classNames = [
		attributes?.collapseOnMobile ? 'has-collapse-on-mobile' : null,
		attributes?.alwaysShowHeader ? 'has-always-show-header' : null,
		attributes?.hasStickyPosition ? 'has-sticky-position' : null,
		attributes?.hasOnlyStickOnMobile ? 'has-only-stick-on-mobile' : null,
	];
	return classNames.filter( ( v ) => v );
};

const htmlElementMessages = {
	section:
		"The <section> element should represent a standalone portion of the document that can't be better represented by another element.",
	aside:
		"The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content.",
};

registerBlockType( metadata.name, {
	icon: GroupIcon,
	providesContext: {
		'cmls-collapse-group/bodyId': 'bodyId',
		'cmls-collapse-group/mobileExpandIcon': 'mobileExpandIcon',
	},
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const { tagName: TagName = 'div' } = attributes;
		const [ cssStyles, setCssStyles ] = useState(
			generateStyles( attributes )
		);
		const isWeb = Platform.OS === 'web';

		useEffect( () => {
			window._wpLoadBlockEditor.then( () => {
				generateId( {
					prefix: 'cgcg-',
					attributes: attributes,
					setAttributes: setAttributes,
					attribute: 'bodyId',
				} );
			} );
		}, [] );

		useEffect( () => {
			setCssStyles( generateStyles( attributes ) );
		}, [ attributes ] );

		useEffect( () => {
			setAttributes( {
				className: generateClassNames( attributes ),
			} );
		}, [
			attributes?.collapseOnMobile,
			attributes?.alwaysShowHeader,
			attributes?.hasStickyPosition,
		] );

		const blockProps = useBlockProps( {
			className: generateClassNames( attributes ),
			...generateDataAttributes( attributes ),
			style: cssStyles,
		} );
		return (
			<TagName { ...blockProps }>
				<InspectorControls>
					<Panel>
						<PanelBody title="Collapse">
							<PanelRow>
								<ToggleControl
									label="Collapse on Mobile"
									checked={ attributes.collapseOnMobile }
									onChange={ ( val ) =>
										setAttributes( {
											collapseOnMobile: val,
										} )
									}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Show Header on Desktop"
									checked={ attributes.alwaysShowHeader }
									onChange={ ( val ) =>
										setAttributes( {
											alwaysShowHeader: val,
										} )
									}
								/>
							</PanelRow>

							{ ( attributes.collapseOnMobile ||
								attributes.alwaysShowHeader ) && (
								<PanelRow>
									<ColorControl
										settings={ [
											{
												label: 'Header Separator',
												colorValue:
													attributes.separatorColor,
												onColorChange: ( val ) =>
													setAttributes( {
														separatorColor: val,
													} ),
											},
										] }
									/>
								</PanelRow>
							) }

							{ attributes.collapseOnMobile && (
								<>
									<PanelRow>
										<SelectControl
											label="Expand Icon"
											value={
												attributes.mobileExpandIcon
											}
											options={ [
												{
													value: 'plus',
													label: 'Plus/Minus',
												},
												{
													value: 'arrows',
													label: 'Arrows',
												},
											] }
											onChange={ ( val ) =>
												setAttributes( {
													mobileExpandIcon: val,
												} )
											}
										/>
									</PanelRow>
									<PanelRow>
										<ColorControl
											settings={ [
												{
													label: 'Icon Color',
													colorValue:
														attributes.mobileExpandIconColor,
													onColorChange: ( val ) =>
														setAttributes( {
															mobileExpandIconColor: val,
														} ),
												},
											] }
										/>
									</PanelRow>
								</>
							) }
						</PanelBody>
						<PanelBody title="Sticky Position">
							<PanelRow>
								<ToggleControl
									label="Stick Scroll Position"
									help="Element will 'stick' within its boundary on desktop and mobile."
									checked={ attributes.hasStickyPosition }
									onChange={ ( val ) =>
										setAttributes( {
											hasStickyPosition: val,
										} )
									}
								/>
							</PanelRow>
							{ attributes.hasStickyPosition && (
								<>
									{ ! attributes.backgroundColor && (
										<p>
											<strong>Note: </strong>
											Set a background color on this block
											when using sticky position so
											content underneath it does not show
											through!
										</p>
									) }

									<PanelRow>
										<ToggleControl
											label="Only Stick on Mobile"
											checked={
												attributes.hasOnlyStickOnMobile
											}
											onChange={ ( val ) =>
												setAttributes( {
													hasOnlyStickOnMobile: val,
												} )
											}
										/>
									</PanelRow>

									<PanelRow>
										<TextControl
											label="Sticky Position"
											help={
												<>
													Accepts any valid CSS{ ' ' }
													<em>value</em>. Relative to
													the boundary container's
													top. Default setting
													accounts for masthead height
													in the Cumulus Wordpress
													theme.
												</>
											}
											value={ attributes.stickyPosition }
											onChange={ ( val ) =>
												setAttributes( {
													stickyPosition: val,
												} )
											}
										/>
									</PanelRow>
									<PanelRow>
										<TextControl
											label="Sticky Z-Index"
											help="Z-Index to apply when stuck."
											value={ attributes.stickyZIndex }
											onChange={ ( val ) =>
												setAttributes( {
													stickyZIndex: val,
												} )
											}
										/>
									</PanelRow>

									<h3>Boundary Containers</h3>
									<p>
										The block's stickiness will be contained
										to the specified containers. The
										boundary must be a container of this
										block. If no selector is defined, the
										document body will be used.
									</p>
									<p>
										Containers between the boundary and this
										block which have position may break the
										boundary!
										{ isWeb && (
											<ExternalLink
												href="https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning#positioning_contexts"
												style={ {
													display: 'block',
													marginTop: '8px',
												} }
											>
												Learn more about position
												context
											</ExternalLink>
										) }
									</p>

									<TextControl
										label="Desktop Container"
										help={
											<>
												Accepts any valid CSS{ ' ' }
												<em>selector</em>.
											</>
										}
										value={
											attributes.stickyDesktopContainer
										}
										onChange={ ( val ) =>
											setAttributes( {
												stickyDesktopContainer: val,
											} )
										}
									/>
									<TextControl
										label="Mobile Container"
										help={
											<>
												Accepts any valid CSS{ ' ' }
												<em>selector</em>.
											</>
										}
										value={
											attributes.stickyMobileContainer
										}
										onChange={ ( val ) =>
											setAttributes( {
												stickyMobileContainer: val,
											} )
										}
									/>
								</>
							) }
						</PanelBody>
					</Panel>
				</InspectorControls>
				<InspectorAdvancedControls>
					<SelectControl
						label="HTML element"
						options={ [
							{ label: 'Default (<div>)', value: 'div' },
							{ label: '<section>', value: 'section' },
							{ label: '<aside>', value: 'aside' },
						] }
						value={ TagName }
						onChange={ ( value ) =>
							setAttributes( { tagName: value } )
						}
						help={ htmlElementMessages[ TagName ] }
					/>
				</InspectorAdvancedControls>
				<InnerBlocks
					template={ [
						[ 'cumulus-gutenberg/collapsable-group-header' ],
						[
							'cumulus-gutenberg/collapsable-group-body',
							{
								anchor: attributes.bodyId,
							},
						],
					] }
					templateLock={ false }
				/>
			</TagName>
		);
	},
	save: ( props ) => {
		const { attributes } = props;
		const { tagName: TagName = 'div' } = attributes;
		const blockProps = useBlockProps.save( {
			className: generateClassNames( attributes ),
			...generateDataAttributes( attributes ),
			style: generateStyles( attributes ),
		} );
		return (
			<TagName { ...blockProps }>
				<InnerBlocks.Content />
			</TagName>
		);
	},
} );
