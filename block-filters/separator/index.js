/**
 * Add margin support to core/separator
 */
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const {
	getColorClassName,
	__experimentalUseColorProps: useColorProps,
} = wp.blockEditor;

const addSpacingSupportToSeparator = ( settings, name ) => {
	if ( name !== 'core/separator' ) {
		return settings;
	}
	settings.supports = {
		...settings?.supports,
		spacing: {
			...settings?.supports?.spacing,
			margin: [ 'top', 'bottom' ],
		},
	};
	settings.attributes = {
		...settings?.attributes,
		style: { type: 'object' },
	};
	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'cmls/block-filters/separator/spacing',
	addSpacingSupportToSeparator
);

const addMarginStyleToSeparator = ( props, blockType, attributes ) => {
	if ( blockType.name !== 'core/separator' ) {
		return props;
	}
	if ( attributes?.style?.spacing ) {
		props.style = {
			...props.style,
			marginTop: attributes?.style?.spacing?.margin?.top,
			marginBottom: attributes?.style?.spacing?.margin?.bottom,
		};
	}
	return props;
};
wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'cmls/block-filters/separator/spacing',
	addMarginStyleToSeparator
);

const addSpacingStyleToSeparator = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			if ( props.name !== 'core/separator' ) {
				return <BlockListBlock { ...props } />;
			}
			const { attributes } = props;
			const colorProps = useColorProps( attributes );
			const currentColor = colorProps?.style?.backgroundColor;
			const styles = {
				color: currentColor,
				backgroundColor: currentColor,
				marginTop: attributes?.style?.spacing?.margin?.top,
				marginBottom: attributes?.style?.spacing?.margin?.bottom,
			};

			return (
				<BlockListBlock
					{ ...props }
					wrapperProps={ { style: styles } }
				/>
			);
		};
	},
	'addSpacingStypesToSeparator'
);

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'cmls/block-filters/separator/spacing',
	addSpacingStyleToSeparator
);
