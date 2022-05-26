import metadata from '../../block.json';
import PageSelectorControl from './PageSelectorControl';
import ChildPageSelector from './PageSelectorControl/child-page-selector';
import FontAppearanceControl from 'wpBlockEditor/src/components/font-appearance-control/index.js';
import ColorControl from 'Components/ColorControl';
import PanelRow from 'Components/PanelRow';

import {
	ToggleControl,
	SelectControl,
	RangeControl,
	Flex,
	TextControl,
	__experimentalBoxControl as BoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import { FontSizePicker } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { isEqual } from 'lodash';
import searchRecursive from 'Utilities/searchRecursive';

const Inspector = ( props ) => {
	const { attributes, setAttributes } = props;

	const { currentPostId, parentPostId } = useSelect( ( select ) => {
		return {
			currentPostId: select( 'core/editor' ).getCurrentPostId(),
			parentPostId: select( 'core/editor' ).getEditedPostAttribute(
				'parent'
			),
		};
	} );

	const getDefault = ( key ) => {
		if (
			metadata.attributes.hasOwnProperty( key ) &&
			metadata.attributes[ key ].hasOwnProperty( 'default' )
		) {
			return metadata.attributes[ key ].default;
		}
		return undefined;
	};

	const isDefault = ( keys ) => {
		keys = Array.isArray( keys ) ? keys : [ keys ];
		const test = keys.some( ( key ) => {
			return ! isEqual( attributes[ key ], getDefault( key ) );
		} );
		return ! test;
	};

	const setDefault = ( keys ) => {
		keys = Array.isArray( keys ) ? keys : [ keys ];
		const attrs = {};
		keys.forEach( ( key ) => {
			attrs[ key ] = getDefault( key );
		} );
		setAttributes( attrs );
	};

	return (
		<>
			<ToolsPanel
				label="Query"
				resetAll={ ( cbs ) => {
					cbs.forEach( ( cb ) => cb() );
				} }
			>
				<ToolsPanelItem
					hasValue={ () => true }
					label="Parent Context"
					isShownByDefault={ true }
				>
					<PageSelectorControl
						selectedPostType={ attributes.postType }
						onPostTypeChange={ ( val ) => {
							setAttributes( { postType: val } );
						} }
						selectedPostId={ attributes.parentPostId }
						onPostChange={ ( val ) => {
							setAttributes( { parentPostId: parseInt( val ) } );
						} }
						onPostListLoad={ ( pages ) => {
							// If we've never selected a parent page,
							// get the current page's parent context
							if (
								pages?.length &&
								parentPostId &&
								attributes.parentPostId === undefined
							) {
								if (
									searchRecursive(
										pages,
										( i ) => i?.id === parentPostId,
										'children'
									)
								) {
									console.debug(
										'Setting parent',
										parentPostId,
										attributes.parentPostId
									);
									setAttributes( {
										parentPostId: parentPostId,
									} );
								}
							}
						} }
					/>

					{ attributes.parentPostId !== currentPostId && (
						<PanelRow>
							<Flex direction="column">
								<p>
									If the <strong>current page</strong> is in
									the parent context's hierarchy:
								</p>
								<ToggleControl
									label="Include This Page's Children"
									checked={ attributes.showCurrentChildren }
									onChange={ ( val ) =>
										setAttributes( {
											showCurrentChildren: val,
										} )
									}
								/>
							</Flex>
						</PanelRow>
					) }
				</ToolsPanelItem>

				{ attributes.parentPostId !== null && (
					<>
						<ToolsPanelItem
							label="Max Depth"
							hasValue={ () => ! isDefault( 'maxDepth' ) }
							resetAllFilter={ () =>
								setDefault( [ 'maxDepth' ] )
							}
							isShownByDefault={ true }
						>
							<RangeControl
								label="Maximum depth of children to display"
								allowReset
								resetFallbackValue={ 0 }
								step={ 1 }
								type="stepper"
								withInputField={ false }
								marks={ [
									{
										value: 0,
										label: 'All',
									},
									...[ 1, 2, 3, 4, 5, 6 ].map( ( i ) => {
										return {
											value: i,
											label: i,
										};
									} ),
								] }
								value={ attributes.maxDepth }
								onChange={ ( val ) =>
									setAttributes( { maxDepth: val } )
								}
								min={ 0 }
								max={ 6 }
							/>
						</ToolsPanelItem>

						<ToolsPanelItem
							label="Exclusions"
							hasValue={ () =>
								! isDefault( 'excludeAdditionalIDs' )
							}
							resetAllFilter={ () =>
								setDefault( [
									'excludeAdditionalIDs',
									'excludeNoIndex',
								] )
							}
							isShownByDefault={ true }
						>
							<ChildPageSelector
								label="Exclude Specific Child Pages"
								help={ `Select multiple or deselect an item by holding
												${
													(
														navigator?.userAgentData
															?.platform ||
														navigator?.platform ||
														'unknown'
													)
														.toUpperCase()
														.indexOf( 'MAC' ) == 0
														? 'Command (⌘)'
														: 'Control'
												}
												while clicking.` }
								noOptionLabel={ false }
								multiple={ true }
								postType={ attributes.postType }
								parentPostId={ attributes.parentPostId }
								selectedId={ attributes.excludeAdditionalIDs }
								onChange={ ( val ) =>
									setAttributes( {
										excludeAdditionalIDs: val,
									} )
								}
							/>

							{ attributes.excludeAdditionalIDs.length > 0 && (
								<TextControl
									label="Raw excluded page IDs"
									value={ attributes.excludeAdditionalIDs.join(
										','
									) }
									onChange={ ( val ) => {
										const excludes = val.match(
											/(?<id>\d+)/
										);
										if (
											excludes?.groups?.id &&
											excludes?.groups?.id?.length
										) {
											setAttributes( {
												excludeAdditionalIDs:
													excludes.groups.id,
											} );
										} else {
											setAttributes( {
												excludeAdditionalIDs: [],
											} );
										}
									} }
								/>
							) }

							<ToggleControl
								label="Automatically exclude pages marked 'noindex' in popular SEO plugins."
								checked={ attributes.excludeNoindex }
								onChange={ ( val ) =>
									setAttributes( { excludeNoindex: val } )
								}
							/>
						</ToolsPanelItem>
					</>
				) }
			</ToolsPanel>

			<ToolsPanel
				label="List Style"
				resetAll={ ( cbs ) => cbs.forEach( ( cb ) => cb() ) }
			>
				<ToolsPanelItem
					label="List Type"
					isShownByDefault={ true }
					hasValue={ () => ! isDefault( 'displayType' ) }
					resetAllFilter={ () => setDefault( [ 'displayType' ] ) }
				>
					<SelectControl
						label="Display Type"
						labelPosition="side"
						value={ attributes.displayType }
						onChange={ ( val ) =>
							setAttributes( { displayType: val } )
						}
						options={ metadata.attributes.displayType.enum.map(
							( opt ) => ( {
								value: opt,
								label:
									opt.charAt( 0 ).toUpperCase() +
									opt.slice( 1 ),
							} )
						) }
					/>
				</ToolsPanelItem>

				{ attributes.displayType !== 'plain' && (
					<ToolsPanelItem
						isShownByDefault={ true }
						label="Bullet Style"
						hasValue={ () =>
							! isDefault( [ 'customBullet', 'bulletColor' ] )
						}
						resetAllFilter={ () =>
							setDefault( [ 'customBullet', 'bulletColor' ] )
						}
					>
						{ attributes.displayType == 'custom' && (
							<PanelRow>
								<TextControl
									label="Custom Bullet"
									value={ attributes.customBullet }
									style={ { width: '10ch' } }
									onChange={ ( val ) =>
										setAttributes( {
											customBullet: val.substring( 0, 1 ),
										} )
									}
								/>
							</PanelRow>
						) }
						<PanelRow>
							<ColorControl
								settings={ [
									{
										label: 'Bullet Color',
										colorValue: attributes.bulletColor,
										onColorChange: ( val ) =>
											setAttributes( {
												bulletColor: val,
											} ),
									},
								] }
							/>
						</PanelRow>
					</ToolsPanelItem>
				) }

				<ToolsPanelItem
					label="Item Margins"
					hasValue={ () =>
						! isDefault( [ 'itemMargin', 'childrenMargin' ] )
					}
					resetAllFilter={ () =>
						setDefault( [ 'itemMargin', 'childrenMargin' ] )
					}
				>
					<PanelRow>
						<BoxControl
							label="Item Margin"
							values={ {
								top: attributes.itemMargin?.top,
								right: attributes.itemMargin?.right,
								bottom: attributes.itemMargin?.bottom,
								left: attributes.itemMargin?.left,
							} }
							onChange={ ( val ) =>
								setAttributes( { itemMargin: val } )
							}
						/>
					</PanelRow>

					<PanelRow>
						<BoxControl
							label="Children Container Margin"
							values={ {
								top: attributes.childrenMargin?.top,
								right: attributes.childrenMargin?.right,
								bottom: attributes.childrenMargin?.bottom,
								left: attributes.childrenMargin?.left,
							} }
							onChange={ ( val ) =>
								setAttributes( { childrenMargin: val } )
							}
						/>
					</PanelRow>
				</ToolsPanelItem>
			</ToolsPanel>

			<ToolsPanel
				label="Link Styles"
				resetAll={ ( cbs ) => cbs.forEach( ( cb ) => cb() ) }
			>
				<ToolsPanelItem
					label="All Links"
					hasValue={ () =>
						! isDefault( [
							'linkColor',
							'linkColorHover',
							'underlineLinks',
							'underlineOnHover',
						] )
					}
					resetAllFilter={ () =>
						setDefault( [
							'linkColor',
							'linkColorHover',
							'underlineLinks',
							'underlineOnHover',
						] )
					}
				>
					<PanelRow>
						<ToggleControl
							label="Underline Links"
							checked={ attributes.underlineLinks }
							onChange={ ( val ) =>
								setAttributes( { underlineLinks: val } )
							}
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Underline Links on Hover"
							checked={ attributes.underlineOnHover }
							onChange={ ( val ) =>
								setAttributes( { underlineOnHover: val } )
							}
						/>
					</PanelRow>

					<PanelRow>
						<ColorControl
							settings={ [
								{
									label: 'Link Color',
									colorValue: attributes.linkColor,
									onColorChange: ( val ) =>
										setAttributes( {
											linkColor: val,
										} ),
								},
								{
									label: 'Hover Color',
									colorValue: attributes.linkColorHover,
									onColorChange: ( val ) =>
										setAttributes( {
											linkColorHover: val,
										} ),
								},
							] }
						/>
					</PanelRow>
				</ToolsPanelItem>

				<ToolsPanelItem
					label="Current Page"
					hasValue={ () =>
						! isDefault( [
							'highlightCurrent',
							'currentFontSize',
							'currentFontWeight',
							'currentFontStyle',
							'currentLinkColor',
							'currentUnderlineLinks',
							'currentLinkColorHover',
							'currentUnderlineOnHover',
						] )
					}
					resetAllFilter={ () =>
						setDefault( [
							'highlightCurrent',
							'currentFontSize',
							'currentFontWeight',
							'currentFontStyle',
							'currentLinkColor',
							'currentUnderlineLinks',
							'currentLinkColorHover',
							'currentUnderlineOnHover',
						] )
					}
				>
					<h3>Current Page Highlight</h3>

					<ToggleControl
						label="Highlight Current Page"
						checked={ attributes.highlightCurrent }
						onChange={ ( val ) =>
							setAttributes( { highlightCurrent: val } )
						}
					/>

					{ attributes.highlightCurrent && (
						<>
							<PanelRow>
								<FontSizePicker
									label="Current Page Font Size"
									value={ attributes.currentFontSize }
									onChange={ ( val ) =>
										setAttributes( {
											currentFontSize: val,
										} )
									}
								/>
							</PanelRow>
							<PanelRow>
								<FontAppearanceControl
									value={ {
										fontStyle: attributes.currentFontStyle,
										fontWeight:
											attributes.currentFontWeight,
									} }
									onChange={ ( val ) =>
										setAttributes( {
											currentFontStyle: val.fontStyle,
											currentFontWeight: val.fontWeight,
										} )
									}
								/>
							</PanelRow>

							<PanelRow>
								<ToggleControl
									label="Underline Current Page Link"
									checked={ attributes.currentUnderlineLinks }
									onChange={ ( val ) =>
										setAttributes( {
											currentUnderlineLinks: val,
										} )
									}
								/>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Underline Current Page Link on Hover"
									checked={
										attributes.currentUnderlineOnHover
									}
									onChange={ ( val ) =>
										setAttributes( {
											currentUnderlineOnHover: val,
										} )
									}
								/>
							</PanelRow>

							<PanelRow>
								<ColorControl
									settings={ [
										{
											label: 'Link Color',
											colorValue:
												attributes.currentLinkColor,
											onColorChange: ( val ) =>
												setAttributes( {
													currentLinkColor: val,
												} ),
										},
										{
											label: 'Hover Color',
											colorValue:
												attributes.currentLinkColorHover,
											onColorChange: ( val ) =>
												setAttributes( {
													currentLinkColorHover: val,
												} ),
										},
									] }
								/>
							</PanelRow>
						</>
					) }
				</ToolsPanelItem>
			</ToolsPanel>
		</>
	);
};
export default Inspector;
