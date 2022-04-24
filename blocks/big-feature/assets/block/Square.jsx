import { foreground as iconForeground } from './icon.jsx';
import metadata from '../../children.json';
import {
	link as linkIcon,
	linkOff as linkOffIcon,
	//	edit as editIcon,
	image as imageIcon,
} from '@wordpress/icons';

const { registerBlockType } = wp.blocks;
const {
	Panel,
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarButton,
	Flex,
	FlexItem,
	Button,
	TextControl,
	Dropdown,
	Icon,
	IconButton,
	ExternalLink,
} = wp.components;
const {
	useBlockProps,
	BlockControls,
	InspectorControls,
	MediaReplaceFlow,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	__experimentalLinkControl: LinkControl,
} = wp.blockEditor;
const {
	filterURLForDisplay,
	safeDecodeURI,
	getAuthority,
	getPathAndQueryString,
	getFragment,
} = wp.url;
const { __unstableStripHTML: stripHTML } = wp.dom;
const { useState, useEffect } = wp.element;

const stripDomain = ( url ) => {
	if (
		getAuthority( url )
			.toLowerCase()
			.includes( window.location.host.toLowerCase() )
	) {
		const path = getPathAndQueryString( url ) || '';
		const fragment = getFragment( url ) || '';
		return path + fragment;
	}
	return url;
};

const attributeDefault = {
	type: 'string',
	source: 'attribute',
};

const squareAttributes = {
	mediaUrl: {
		...attributeDefault,
		selector: 'img',
		attribute: 'src',
		default:
			'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
	},
	alt: {
		...attributeDefault,
		selector: 'img',
		attribute: 'alt',
		default: '',
	},
	href: {
		...attributeDefault,
		selector: 'a',
		attribute: 'href',
		default: null,
	},
	linkTarget: {
		...attributeDefault,
		selector: 'a',
		attribute: 'target',
	},
	rel: {
		...attributeDefault,
		selector: 'a',
		attribute: 'rel',
	},
};

/**
 * Determine if an attribute is set to its default value
 * @param {object} attributes
 * @param {string} key
 * @returns {boolean}
 */
const isDefault = ( attributes, key ) => {
	return !! (
		squareAttributes[ key ].hasOwnProperty( 'default' ) &&
		attributes[ key ] == squareAttributes[ key ].default
	);
};

registerBlockType( 'cumulus-gutenberg/big-feature-square', {
	...metadata,
	title: 'Big Feature Square',
	description: 'Image container within a Big Feature',
	keywords: [ ...metadata.keywords, 'box', 'image' ],
	parent: [
		'cumulus-gutenberg/big-feature-column',
		'cumulus-gutenberg/big-feature-small-cluster',
	],
	icon: {
		src: 'format-image',
		foreground: iconForeground,
	},
	attributes: squareAttributes,
	edit: ( props ) => {
		const { attributes, setAttributes } = props;
		const warningIcon = <Icon icon="warning" style={ { color: 'red' } } />;

		/**
		 * When media is available, store the largest size available and set up our alt attribute
		 * @param {object} media
		 */
		const onSelectMedia = ( media ) => {
			// Try to get the largest media size available
			const src =
				media?.sizes?.full?.url ||
				media?.media_details?.sizes?.full?.source_url;
			const alt = media?.alt;
			const attr = {
				mediaUrl: stripDomain( src || media.url ),
			};
			if ( alt ) {
				attr.alt = alt;
			}
			setAttributes( attr );
		};

		/**
		 * Reset attributes to their default values.
		 */
		const resetAttributes = () => {
			const newAttr = {};
			for ( const key in attributes ) {
				newAttr[ key ] = square.attributes[ key ].default;
			}
			setAttributes( newAttr );
		};

		const AltInput = (
			<TextControl
				label="Image Alt Attribute"
				help={
					<>
						{ ! attributes.alt && (
							<strong
								style={ {
									color: 'red',
									fontStyle: 'italic',
								} }
							>
								Alt attributes are <u>necessary</u> for SEO and
								accessibility!
							</strong>
						) }
						<> </>
						This should be the name of the show you're featuring or
						some other short, text interpretation of the image/link.
					</>
				}
				value={ attributes.alt }
				onChange={ ( val ) => setAttributes( { alt: val } ) }
			/>
		);

		const PostSearch = () => {
			return (
				<LinkControl
					searchInputPlaceholder="Search here…"
					value={ {
						url: attributes.href,
						title: attributes.alt,
						opensInNewTab: attributes.linkTarget === '_blank',
						useTitleAsAlt: true,
					} }
					settings={ [
						{
							id: 'opensInNewTab',
							title: 'Open in a new tab',
						},
						{
							id: 'useTitleAsAlt',
							title: 'Use Post Title as "alt" attribute',
						},
					] }
					onChange={ ( val ) => {
						setAttributes( {
							href: stripDomain( val.url ),
							alt: val.useTitleAsAlt ? val.title : attributes.alt,
							linkTarget: val.opensInNewTab ? '_blank' : '_self',
							rel: val.opensInNewTab ? 'noopener' : '',
						} );
					} }
					onRemove={ () =>
						setAttributes( {
							href: null,
							linkTarget: null,
							rel: null,
						} )
					}
				/>
			);
		};

		const [ classNames, setClassNames ] = useState( [] );
		const [ titles, setTitles ] = useState( [] );

		useEffect( () => {
			if ( isDefault( attributes, 'mediaUrl' ) ) {
				setClassNames( [ 'is-placeholder' ] );
			} else {
				const newClassNames = [];
				const newTitles = [];
				if ( isDefault( attributes, 'href' ) ) {
					newClassNames.push( 'is-unlinked' );
					newTitles.push( 'Image needs a link.' );
				} else {
					newClassNames.push( 'is-linked' );
				}
				if ( isDefault( attributes, 'alt' ) ) {
					newClassNames.push( 'is-inaccessable' );
					newTitles.push( 'Image needs an "alt" attribute.' );
				}
				if ( newClassNames.length ) {
					setClassNames( newClassNames );
					setTitles( newTitles );
				}
			}
		}, [ attributes ] );

		const blockProps = useBlockProps( {
			className: classNames,
			title: titles.join( '\n' ),
		} );

		return (
			<li { ...blockProps }>
				<BlockControls>
					{ ! isDefault( attributes, 'mediaUrl' ) && (
						<>
							<ToolbarGroup>
								<MediaReplaceFlow
									mediaId={ attributes.mediaId }
									mediaURL={ attributes.mediaUrl }
									allowedTypes={ [ 'image' ] }
									accept="image/*"
									onSelect={ onSelectMedia }
									label="Replace image"
									title="Replace image"
									showTooltip={ true }
									name={
										<>
											<Icon icon={ imageIcon } />
											Replace
										</>
									}
								/>
							</ToolbarGroup>
							<ToolbarGroup>
								<Dropdown
									headerTitle="Alt Attribute"
									contentClassNAme="is-alternate"
									renderToggle={ ( { isOpen, onToggle } ) => (
										<ToolbarButton
											icon={
												attributes.alt
													? 'awards'
													: warningIcon
											}
											label={
												attributes.alt
													? 'Change "alt" attribute'
													: 'Set an "alt" attribute!'
											}
											title={
												attributes.alt
													? 'Change "alt" attribute'
													: 'Set an "alt" attribute!'
											}
											isActive={
												attributes.alt ? true : false
											}
											showTooltip={ true }
											aria-expanded={ isOpen }
											aria-haspopup={ true }
											onClick={ onToggle }
										/>
									) }
									renderContent={ () => {
										return (
											<div
												style={ {
													minWidth: '250px',
													paddingTop: '6px',
													paddingRight: '16px',
													paddingLeft: '16px',
												} }
											>
												{ AltInput }
											</div>
										);
									} }
								/>
							</ToolbarGroup>
							<ToolbarGroup>
								<Dropdown
									headerTitle="Link"
									renderToggle={ ( { isOpen, onToggle } ) => (
										<>
											{ ! attributes.href && (
												<ToolbarButton
													name="link"
													icon={ linkIcon }
													title="Set a link"
													onClick={ onToggle }
													aria-expanded={ isOpen }
													aria-haspopup={ true }
													showTooltip={ true }
												/>
											) }
											{ attributes.href && (
												<ToolbarButton
													name="link"
													icon={ linkOffIcon }
													title="Change link"
													onClick={ onToggle }
													isActive={ true }
													aria-expanded={ isOpen }
													aria-haspopup={ true }
													showTooltip={ true }
												/>
											) }
										</>
									) }
									renderContent={ () => <PostSearch /> }
								/>
							</ToolbarGroup>
						</>
					) }
				</BlockControls>
				<InspectorControls>
					<Panel>
						<PanelBody>
							{ ! isDefault( attributes, 'mediaUrl' ) && (
								<>
									<PanelRow title="Link">
										{ attributes.href && (
											<Flex>
												<FlexItem>
													<ExternalLink
														href={ attributes.href }
														style={ {
															display: 'block',
														} }
													>
														{ stripHTML(
															attributes.alt ||
																attributes.href
														) }
													</ExternalLink>

													<span
														style={ {
															color: '#757575',
															fontSize: '0.9em',
															lineHeight: 1.3,
															wordBreak:
																'break-all',
														} }
													>
														{ filterURLForDisplay(
															safeDecodeURI(
																attributes.href
															),
															16
														) || '' }
													</span>
												</FlexItem>
												<FlexItem
													style={ {
														minWidth: '32px',
													} }
												>
													<Dropdown
														headerTitle="Set a link"
														renderToggle={ ( {
															isOpen,
															onToggle,
														} ) => (
															<IconButton
																isPrimary
																icon={
																	linkOffIcon
																}
																onClick={
																	onToggle
																}
																aria-expanded={
																	isOpen
																}
																aria-haspopup={
																	true
																}
															/>
														) }
														renderContent={ () => (
															<PostSearch />
														) }
													/>
												</FlexItem>
											</Flex>
										) }
										{ ! attributes.href && (
											<Dropdown
												headerTitle="Set a link"
												renderToggle={ ( {
													isOpen,
													onToggle,
												} ) => (
													<IconButton
														isPrimary
														icon={ linkIcon }
														onClick={ onToggle }
														aria-expanded={ isOpen }
														aria-haspopup={ true }
													>
														Set a link
													</IconButton>
												) }
												renderContent={ () => (
													<PostSearch />
												) }
											/>
										) }
									</PanelRow>
									<hr style={ { width: '100%' } } />
									<PanelRow style={ { display: 'block' } }>
										{ AltInput }
									</PanelRow>
									<PanelRow>
										<img
											src={ attributes.mediaUrl }
											width="100%"
										/>
									</PanelRow>
									<PanelRow>
										<MediaUploadCheck>
											<MediaUpload
												Label="Square Image"
												type="image"
												value={ attributes.mediaUrl }
												render={ ( { open } ) => {
													return (
														<Flex>
															<Button
																className="button button-large"
																onClick={ open }
															>
																{ ! isDefault(
																	attributes,
																	'mediaUrl'
																)
																	? `Replace Image`
																	: `Choose Image` }
															</Button>
															{ ! isDefault(
																attributes,
																'mediaUrl'
															) && (
																<Button
																	className="button button-large"
																	onClick={
																		resetAttributes
																	}
																>
																	Remove
																</Button>
															) }
														</Flex>
													);
												} }
												onSelect={ onSelectMedia }
											/>
										</MediaUploadCheck>
									</PanelRow>
								</>
							) }
							{ isDefault( attributes, 'mediaUrl' ) && (
								<MediaPlaceholder
									icon="format-image"
									accept="image/*"
									allowedTypes={ [ 'image' ] }
									onSelect={ onSelectMedia }
								/>
							) }
						</PanelBody>
					</Panel>
				</InspectorControls>

				{ ! isDefault( attributes, 'mediaUrl' ) ? (
					<img src={ attributes.mediaUrl } alt={ attributes.alt } />
				) : (
					<MediaUploadCheck>
						<MediaUpload
							label="Square Image"
							type="image"
							value={ attributes.mediaUrl }
							render={ ( { open } ) => {
								return (
									<img
										className="g-bf-placeholder"
										src={ attributes.mediaUrl }
										alt="Click to add an image"
										title="Click to add an image"
										onClick={ open }
										style={ { cursor: 'pointer' } }
									/>
								);
							} }
							onSelect={ onSelectMedia }
						/>
					</MediaUploadCheck>
				) }
			</li>
		);
	},
	save: ( props ) => {
		const { attributes } = props;
		const blockProps = useBlockProps.save();

		const LinkWrapper = ( props ) => {
			if ( props.href ) {
				return (
					<a
						href={ props.href }
						target={ props.linkTarget }
						rel={ props.rel }
					>
						{ props.children }
					</a>
				);
			}
			return <>{ props?.children }</>;
		};

		if ( attributes.mediaUrl && ! isDefault( attributes, 'mediaUrl' ) ) {
			return (
				<li { ...blockProps }>
					<LinkWrapper { ...attributes }>
						<img
							src={ attributes.mediaUrl }
							alt={ attributes.alt }
						/>
					</LinkWrapper>
				</li>
			);
		}

		return <li { ...blockProps }></li>;
	},
} );
