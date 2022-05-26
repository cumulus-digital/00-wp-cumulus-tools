/**
 * Based on WP's own PanelColorSettings. Provides a consistent color
 * controller for use anywhere within a sidebar panel.
 * https://github.com/WordPress/gutenberg/blob/6b1f4a70008354c9e6665a3a37124100180ecaee/packages/block-editor/src/components/colors-gradients/dropdown.js
 *
 * Generates dropdown groups from a settings array of object properties
 * See ColorIndicator and ColorGradientControl for options.
 */

import getColorPalettes from 'Utilities/getColorPalettes';
import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	__experimentalHStack as HStack,
	FlexItem,
	ColorIndicator,
	Dropdown,
} from '@wordpress/components';
import {
	__experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor';

const ColorControl = (props) => {
	const dropdownPosition = 'bottom left';
	const { settings } = props;

	const colorPalettes = getColorPalettes();

	return (
		<ItemGroup
			isBordered
			isSeparated
			className="block-editor-panel-color-gradient-settings__item-group"
		>
			{settings.map(
				(setting, index) =>
					setting && (
						<Dropdown
							key={index}
							position={dropdownPosition}
							className="block-editor-panel-color-gradient-settings__dropdown"
							contentClassName="block-editor-panel-color-gradient-settings__dropdown-content"
							renderToggle={({ isOpen, onToggle }) => {
								return (
									<Item
										onClick={onToggle}
										className={[
											'block-editor-panel-color-gradient-settings__item',
											isOpen ? 'is-open' : '',
										].filter((v) => v)}
									>
										<HStack justify="flex-start">
											<ColorIndicator
												className="block-editor-panel-color-gradient-settings__color-indicator"
												colorValue={
													setting.gradientValue ??
													setting.colorValue
												}
											/>
											<FlexItem>
												{setting.label}
											</FlexItem>
										</HStack>
									</Item>
								);
							}}
							renderContent={() => (
								<ColorGradientControl
									showTitle={!!setting.label}
									__experimentalIsRenderedInSidebar={true}
									{...colorPalettes}
									{...setting}
								/>
							) }
						/>
					)
			) }
		</ItemGroup>
	);
};
export default ColorControl;
