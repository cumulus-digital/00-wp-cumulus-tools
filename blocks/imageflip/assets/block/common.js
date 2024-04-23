/**
 * Common
 */

export { isEqual } from 'lodash';

export const validUnits = [
	{ value: 'px', label: 'px', default: 0 },
	{ value: '%', label: '%', default: 0 },
	{ value: 'em', label: 'em', default: 0 },
	{ value: 'rem', label: 'rem', default: 0 },
];

/**
 * Determines if a block style has a setting
 *
 * @param  {Object} block Style object with top, right, etc
 * @return {boolean}      True if any block style property is defined.
 */
export const hasBlockStyle = ( block ) => {
	return (
		block &&
		( block.top ||
			block.right ||
			block.bottom ||
			block.left ||
			block.topLeft ||
			block.topRight ||
			block.bottomRight ||
			block.bottomLeft )
	);
};

/**
 * Determine if all block styles match
 *
 * @param  {Object} block Style object with top, right, etc
 * @return {boolean}      True if all block styles match.
 */
export const blockStylesMatch = ( block ) => {
	if ( block ) {
		const vals = Object.values( block );
		return vals.every( ( v ) => {
			return v === vals[ 0 ];
		} );
	}
	return false;
};

export const processStyles = ( attr ) => {
	let newStyles = {};

	if ( attr.backgroundSizing ) {
		newStyles.backgroundSize =
			attr.backgroundSizing === 'percent'
				? `${ attr.backgroundSizingPercent }%`
				: attr.backgroundSizing;
	}

	if ( attr.backgroundPosition ) {
		newStyles.backgroundPosition = `${ attr.backgroundPosition.x * 100 }% ${
			attr.backgroundPosition.y * 100
		}%`;
	}

	if ( attr.backgroundImage ) {
		newStyles.backgroundImage = `url("${ attr.backgroundImage }")`;
	}

	if ( hasBlockStyle( attr.padding ) ) {
		if ( blockStylesMatch( attr.padding ) ) {
			newStyles.padding = attr.padding.top;
		} else {
			newStyles = {
				...newStyles,
				paddingTop: attr.padding.top,
				paddingRight: attr.padding.right,
				paddingBottom: attr.padding.bottom,
				paddingLeft: attr.padding.left,
			};
		}
	}

	if ( hasBlockStyle( attr.borderWidth ) ) {
		if ( blockStylesMatch( attr.borderWidth ) ) {
			newStyles.borderWidth = attr.borderWidth.top;
		} else {
			newStyles = {
				...newStyles,
				borderTopWidth: attr.borderWidth.top,
				borderRightWidth: attr.borderWidth.right,
				borderBottomWidth: attr.borderWidth.bottom,
				borderLeftWidth: attr.borderWidth.left,
			};
		}
	}
	if ( attr.borderColor ) {
		newStyles.borderColor = attr.borderColor;
	}

	if (
		attr.shadowColor ||
		attr.shadowOffsetX ||
		attr.shadowOffsetY ||
		attr.shadowRadius
	) {
		const shadow = [
			attr.shadowOffsetX || 0,
			attr.shadowOffsetY || 0,
			attr.shadowRadius || 0,
			attr.shadowColor || 'transparent',
		];
		newStyles.boxShadow = shadow.join( ' ' );
	}

	if ( hasBlockStyle( attr.borderRadius ) ) {
		if ( blockStylesMatch( attr.borderRadius ) ) {
			newStyles.borderRadius = attr.borderRadius.topLeft;
		} else {
			newStyles = {
				...newStyles,
				borderTopLeftRadius: attr.borderRadius.topLeft,
				borderTopRightRadius: attr.borderRadius.topRight,
				borderBottomRightRadius: attr.borderRadius.bottomRight,
				borderBottomLeftRadius: attr.borderRadius.bottomLeft,
			};
		}
	}

	return {
		...attr.style,
		...newStyles,
	};
};
