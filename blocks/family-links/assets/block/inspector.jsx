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
	FlexItem,
	TextControl,
	__experimentalBoxControl as BoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';
import {
	FontSizePicker,
	InspectorControls,
	__experimentalSpacingSizesControl as SpacingSizesControl,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { isEqual } from 'lodash';
import searchRecursive from 'Utilities/searchRecursive';

export const Inspectors = ( props ) => {
	const { attributes, setAttributes } = props;

	const { currentPostId, parentPostId } = useSelect( ( select ) => {
		return {
			currentPostId: select( 'core/editor' ).getCurrentPostId(),
			parentPostId:
				select( 'core/editor' ).getEditedPostAttribute( 'parent' ),
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
			<InspectorControls group="settings">
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
						<PanelRow>
							<PageSelectorControl
								selectedPostType={ attributes.postType }
								onPostTypeChange={ ( val ) => {
									setAttributes( { postType: val } );
								} }
								selectedPostId={ attributes.parentPostId }
								onPostChange={ ( val ) => {
									setAttributes( {
										parentPostId: parseInt( val ),
									} );
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
						</PanelRow>

						{ attributes.parentPostId !== currentPostId && (
							<PanelRow>
								<ToggleControl
									label="Include This Page's Children"
									help="Applies only if the current page is a child of the selected parent."
									checked={ attributes.showCurrentChildren }
									onChange={ ( val ) =>
										setAttributes( {
											showCurrentChildren: val,
										} )
									}
								/>
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
								<PanelRow>
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
										selectedId={
											attributes.excludeAdditionalIDs
										}
										onChange={ ( val ) =>
											setAttributes( {
												excludeAdditionalIDs: val,
											} )
										}
									/>

									{ attributes.excludeAdditionalIDs.length >
										0 && (
										<TextControl
											label="Raw excluded page IDs"
											value={ attributes.excludeAdditionalIDs.join(
												','
											) }
											onChange={ ( val ) => {
												const excludes =
													val.match( /(?<id>\d+)/ );
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
														excludeAdditionalIDs:
															[],
													} );
												}
											} }
										/>
									) }
								</PanelRow>

								<PanelRow>
									<ToggleControl
										label="Exclude 'noindex' Pages"
										help="Automatically exclude pages marked 'noindex' in popular SEO plugins."
										checked={ attributes.excludeNoindex }
										onChange={ ( val ) =>
											setAttributes( {
												excludeNoindex: val,
											} )
										}
									/>
								</PanelRow>
							</ToolsPanelItem>
						</>
					) }
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls group="styles">
				<ToolsPanel
					label="List"
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
							hasValue={ () => {
								! isDefault( [
									'customBullet',
									'bulletColor',
								] );
							} }
							resetAllFilter={ () => {
								setDefault( [ 'customBullet', 'bulletColor' ] );
							} }
						>
							{ attributes.displayType == 'custom' && (
								<PanelRow>
									<TextControl
										label="Custom Bullet"
										value={ attributes.customBullet }
										style={ { width: '10ch' } }
										onChange={ ( val ) =>
											setAttributes( {
												customBullet: val.substring(
													0,
													1
												),
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
						resetAllFilter={ () => {
							setDefault( [ 'itemMargin', 'childrenMargin' ] );
						} }
					>
						<PanelRow>
							<SpacingSizesControl
								label="Item Margin"
								values={ attributes.itemMargin }
								onChange={ ( val ) =>
									setAttributes( { itemMargin: val } )
								}
							/>
						</PanelRow>

						{ attributes.maxDepth === 0 ||
							( attributes.maxDepth > 1 && (
								<PanelRow>
									<SpacingSizesControl
										label="Children Container Margin"
										values={ attributes.childrenMargin }
										onChange={ ( val ) =>
											setAttributes( {
												childrenMargin: val,
											} )
										}
									/>
								</PanelRow>
							) ) }
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label="Links"
					resetAll={ ( cbs ) => cbs.forEach( ( cb ) => cb() ) }
				>
					<ToolsPanelItem
						label="Link Color"
						hasValue={ () =>
							! isDefault( [ 'linkColor', 'linkColorHover' ] )
						}
						resetAllFilter={ () => {
							setDefault( [ 'linkColor', 'linkColorHover' ] );
						} }
						isShownByDefault={ true }
					>
						<PanelRow>
							<ColorControl
								settings={ [
									{
										label: 'Color',
										colorValue: attributes.linkColor,
										onColorChange: ( val ) =>
											setAttributes( {
												linkColor: val,
											} ),
									},
									{
										label: 'Hover',
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
						label="Link Underlines"
						hasValue={ () =>
							! isDefault( [
								'underlineLinks',
								'underlineOnHover',
							] )
						}
						resetAllFilter={ () => {
							setDefault( [
								'underlineLinks',
								'underlineOnHover',
							] );
						} }
						isShownByDefault={ true }
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
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label="Current Page Item"
					resetAll={ ( cbs ) => cbs.forEach( ( cb ) => cb() ) }
				>
					<ToolsPanelItem
						label="Highlight Current Page"
						hasValue={ () => ! isDefault( 'highlightCurrent' ) }
						isShownByDefault={ true }
					>
						<ToggleControl
							label="Highlight Current Page"
							checked={ attributes.highlightCurrent }
							onChange={ ( val ) =>
								setAttributes( { highlightCurrent: val } )
							}
						/>
					</ToolsPanelItem>

					{ attributes.highlightCurrent && (
						<>
							<ToolsPanelItem
								label="Item Color"
								hasValue={ () =>
									! isDefault( [
										'currentLinkColor',
										'currentLinkColorHover',
									] )
								}
								resetAllFilter={ () => {
									setDefault( [
										'currentLinkColor',
										'currentLinkColorHover',
									] );
								} }
							>
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
														currentLinkColorHover:
															val,
													} ),
											},
										] }
									/>
								</PanelRow>
							</ToolsPanelItem>

							<ToolsPanelItem
								label="Font Size"
								hasValue={ () =>
									! isDefault( 'currentFontSize' )
								}
								resetAllFilter={ () => {
									setDefault( [ 'currentFontSize' ] );
								} }
							>
								<PanelRow>
									<FontSizePicker
										value={ attributes.currentFontSize }
										onChange={ ( val ) =>
											setAttributes( {
												currentFontSize: val,
											} )
										}
									/>
								</PanelRow>
							</ToolsPanelItem>

							<ToolsPanelItem
								label="Font Style"
								hasValue={ () =>
									! isDefault( [
										'currentFontStyle',
										'currentFontWeight',
									] )
								}
								resetAllFilter={ () => {
									setDefault( [
										'currentFontStyle',
										'currentFontWeight',
									] );
								} }
							>
								<PanelRow>
									<FontAppearanceControl
										value={ {
											fontStyle:
												attributes.currentFontStyle,
											fontWeight:
												attributes.currentFontWeight,
										} }
										onChange={ ( val ) =>
											setAttributes( {
												currentFontStyle: val.fontStyle,
												currentFontWeight:
													val.fontWeight,
											} )
										}
									/>
								</PanelRow>
							</ToolsPanelItem>

							<ToolsPanelItem
								label="Underlines"
								hasValue={ () =>
									! isDefault( [
										'currentUnderlineLinks',
										'currentUnderlineOnHover',
									] )
								}
								resetAllFilter={ () => {
									setDefault( [
										'currentUnderlineLinks',
										'currentUnderlineOnHover',
									] );
								} }
							>
								<PanelRow>
									<ToggleControl
										label="Underline"
										checked={
											attributes.currentUnderlineLinks
										}
										onChange={ ( val ) =>
											setAttributes( {
												currentUnderlineLinks: val,
											} )
										}
									/>
								</PanelRow>
								<PanelRow>
									<ToggleControl
										label="Underline on Hover"
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
							</ToolsPanelItem>
						</>
					) }
				</ToolsPanel>
			</InspectorControls>
		</>
	);
};
export default Inspectors;
