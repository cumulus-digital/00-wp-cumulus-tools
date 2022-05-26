/**
 * Based on WP's own PanelColorSettings. Provides a consistent color
 * controller for use anywhere within a sidebar panel.
 * https://github.com/WordPress/gutenberg/blob/6b1f4a70008354c9e6665a3a37124100180ecaee/packages/block-editor/src/components/colors-gradients/dropdown.js
 *
 * Generates dropdown groups from a settings array of object properties
 * See ColorIndicator and ColorGradientControl for options.
 */

import {
	__experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	__experimentalHStack as HStack,
	FlexItem,
	ColorIndicator,
	Dropdown,
} from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { _x } from '@wordpress/i18n';
import {
	useSetting,
	__experimentalColorGradientControl as ColorGradientControl
} from '@wordpress/block-editor';

const useCommonSingleMultipleSelects = () => {
	return {
		disableCustomColors: ! useSetting( 'color.custom' ),
		disableCustomGradients: ! useSetting( 'color.customGradient' ),
	};
}

const ColorControl = (props) => {
	const dropdownPosition = 'bottom left';
	const { settings } = props;

	const colorGradientSettings = useCommonSingleMultipleSelects();
	const customColors = useSetting( 'color.palette.custom' );
	const themeColors = useSetting( 'color.palette.theme' );
	const defaultColors = useSetting( 'color.palette.default' );
	const shouldDisplayDefaultColors = useSetting( 'color.defaultPalette' );

	colorGradientSettings.colors = useMemo( () => {
		const result = [];
		if ( themeColors && themeColors.length ) {
			result.push({
				name: _x(
					'Theme',
					'Indicates this palette comes from the theme.'
				),
				colors: themeColors,
			} );
		}
		if (
			shouldDisplayDefaultColors &&
			defaultColors &&
			defaultColors.length
		) {
			result.push({
				name: _x(
					'Default',
					'Indicates this palette comes from WordPress.'
				),
				colors: defaultColors,
			} );
		}
		if ( customColors && customColors.length ) {
			result.push({
				name: _x(
					'Custom',
					'Indicates this palette comes from the theme.'
				),
				colors: customColors,
			} );
		}
		return result;
	}, [ defaultColors, themeColors, customColors ] );

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
									__experimentalHasMultipleOrigins={true}
									__experimentalIsRenderedInSidebar={true}
									{...colorGradientSettings}
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
