/**
 * Return a complete multi-palette of theme, default, and custom color palettes.
 */

import { useMemo } from '@wordpress/element';
import { _x } from '@wordpress/i18n';
import {
	useSettings,
	__experimentalColorGradientControl as ColorGradientControl,
} from '@wordpress/block-editor';

const useCommonSingleMultipleSelects = () => {
	const [ hasCustomColors, hasCustomGradients ] = useSettings(
		'color.custom',
		'color.customGradient'
	);
	return {
		disableCustomColors: ! hasCustomColors,
		disableCustomGradients: ! hasCustomGradients,
	};
};

export default () => {
	const colorSettings = useCommonSingleMultipleSelects();
	const [
		customColors,
		themeColors,
		defaultColors,
		shouldDisplayDefaultColors,
	] = useSettings(
		'color.palette.custom',
		'color.palette.theme',
		'color.palette.default',
		'color.defaultPalette'
	);
	console.log( {
		customColors,
		themeColors,
		defaultColors,
		shouldDisplayDefaultColors,
	} );

	colorSettings.__experimentalHasMultipleOrigins = true;
	colorSettings.colors = useMemo( () => {
		const result = [];
		if ( themeColors && themeColors.length ) {
			result.push( {
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
			result.push( {
				name: _x(
					'Default',
					'Indicates this palette comes from WordPress.'
				),
				colors: defaultColors,
			} );
		}
		if ( customColors && customColors.length ) {
			result.push( {
				name: _x(
					'Custom',
					'Indicates this palette comes from the theme.'
				),
				colors: customColors,
			} );
		}
		return result;
	}, [ defaultColors, themeColors, customColors ] );
	return colorSettings;
};
