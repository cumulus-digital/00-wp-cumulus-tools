/**
 * Add margin support to any block!
 */
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;

// List of blocks to add margin support to
const affectsBlocks = [
	'core/audio',
	'core/calendar',
	'core/categories',
	'core/cover',
	'core/embed',
	'core/image',
	'core/latest-comments',
	'core/latest-posts',
	'core/list',
	'core/media-text',
	'core/post-author',
	'core/post-author-name',
	'core/post-date',
	'core/post-content',
	'core/post-excerpt',
	'core/search',
	'core/separator',
	'core/tag-cloud',
	'core/video',
];

// add attributes and supports to block metadata
const addSpacingSupportToSeparator = ( settings, name ) => {
	if ( ! affectsBlocks.includes( name ) ) {
		return settings;
	}

	if ( settings?.supports?.spacing?.margin === true ) {
		return settings;
	}

	settings.supports = {
		...settings?.supports,
		spacing: {
			...settings?.supports?.spacing,
			margin: [ ...settings?.supports?.spacing?.margin, 'top', 'bottom' ],
		},
	};
	settings.attributes = {
		...settings?.attributes,
		style: { type: 'object' },
	};
	console.debug( `Added margin support to ${ name }` );
	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'cmls/block-filters/separator/spacing',
	addSpacingSupportToSeparator
);

const addMarginStyleToSeparator = ( props, blockType, attributes ) => {
	if ( ! affectsBlocks.includes( blockType.name ) ) {
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
			if ( ! affectsBlocks.includes( props.name ) ) {
				return <BlockListBlock { ...props } />;
			}
			const { attributes } = props;
			const styles = {
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
