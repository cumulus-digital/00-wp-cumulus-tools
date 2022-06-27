import { isDefault, formatMedia, resetAttributes } from './utils';
import AltInput from './alt-input';
import PostSearch from './post-search';
import { MediaUploader } from './media-uploader';
import PanelRow from 'Components/PanelRow';

import {
	link as linkIcon,
	linkOff as linkOffIcon,
	image as imageIcon,
} from '@wordpress/icons';
import {
	Panel,
	PanelBody,
	Flex,
	FlexItem,
	Button,
	Dropdown,
	ExternalLink,
} from '@wordpress/components';
import { InspectorControls, MediaPlaceholder } from '@wordpress/blockEditor';
import { filterURLForDisplay, safeDecodeURI } from '@wordpress/url';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';

const SquareInspectorControls = ( {
	attributes,
	setAttributes,
	alerts,
	mediaSize,
} ) => {
	return (
		<InspectorControls>
			<Panel>
				<PanelBody>
					{ alerts && alerts.length ? (
						<PanelRow>
							<div
								style={ {
									display: 'block',
									position: 'relative',
									width: '100%',
								} }
							>
								<ul
									style={ {
										margin: '0 0 0 2ch',
										listStyle: 'square',
									} }
								>
									{ alerts.map( ( alert, i ) => (
										<li
											key={ i }
											style={ { color: 'red' } }
										>
											{ alert }
										</li>
									) ) }
								</ul>
							</div>
						</PanelRow>
					) : null }

					{ isDefault( attributes, 'mediaUrl' ) ? (
						<MediaPlaceholder
							icon={ imageIcon }
							accept="image/*"
							allowedTypes={ [ 'image' ] }
							onSelect={ ( val ) => {
								setAttributes( formatMedia( val ) );
							} }
						/>
					) : (
						<>
							<PanelRow title="Link">
								{ attributes.href ? (
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
													wordBreak: 'break-all',
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
													<Button
														isPrimary
														icon={ linkOffIcon }
														onClick={ onToggle }
														aria-expanded={ isOpen }
														aria-haspopup={ true }
													/>
												) }
												renderContent={ () => (
													<PostSearch
														{ ...{
															attributes,
															setAttributes,
														} }
													/>
												) }
											/>
										</FlexItem>
									</Flex>
								) : (
									<Dropdown
										headerTitle="Set a link"
										renderToggle={ ( {
											isOpen,
											onToggle,
										} ) => (
											<Button
												isPrimary
												icon={ linkIcon }
												onClick={ onToggle }
												aria-expanded={ isOpen }
												aria-haspopup={ true }
											>
												Set a link
											</Button>
										) }
										renderContent={ () => (
											<PostSearch
												{ ...{
													attributes,
													setAttributes,
												} }
											/>
										) }
									/>
								) }
							</PanelRow>

							<hr style={ { width: '100%' } } />

							<PanelRow style={ { display: 'block' } }>
								<AltInput
									{ ...{ attributes, setAttributes } }
								/>
							</PanelRow>

							<PanelRow>
								<MediaUploader
									{ ...{ attributes, setAttributes } }
									mediaSize={ mediaSize }
									render={ ( { open } ) => {
										return (
											<Flex direction="column">
												<div>
													<img
														src={
															attributes.mediaUrl
														}
														width="100%"
														onClick={ open }
														className={ `wp-image-${ attributes.mediaId }` }
													/>
												</div>
												<Flex direction="row">
													<Button
														className="button button-large"
														onClick={ open }
													>
														Replace Image
													</Button>
													<Button
														className="button button-large"
														onClick={ () => {
															resetAttributes( {
																attributes,
																setAttributes,
															} );
														} }
													>
														Remove
													</Button>
												</Flex>
											</Flex>
										);
									} }
								/>
							</PanelRow>
						</>
					) }
				</PanelBody>
			</Panel>
		</InspectorControls>
	);
};

export default SquareInspectorControls;
