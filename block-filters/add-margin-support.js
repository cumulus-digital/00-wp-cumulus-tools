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
	'core/group',
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
	'core/post-template',
	'core/query',
	'core/query-pagination',
	'core/query-pagination-previous',
	'core/query-pagination-next',
	'core/query-pagination-numbers',
	'core/search',
	'core/separator',
	'core/tag-cloud',
	'core/video',
];

// add attributes and supports to block metadata
const addSpacingSupportToBlocks = ( settings, name ) => {
	if ( ! affectsBlocks.includes( name ) ) {
		return settings;
	}

	if (
		settings?.supports?.spacing?.margin === true ||
		( Array.isArray( settings?.supports?.spacing?.margin ) &&
			settings?.supports?.spacing?.margin.includes( 'top' ) &&
			settings?.supports?.spacing?.margin.includes( 'bottom' ) )
	) {
		return settings;
	}

	let newMargin = [ 'top', 'bottom' ];
	if ( settings?.supports?.spacing?.margin ) {
		newMargin = [ settings?.supports?.spacing?.margin, ...newMargin ];
	}
	settings.supports = {
		...settings?.supports,
		spacing: {
			...settings?.supports?.spacing,
			margin: newMargin,
			__experimentalDefaultControls: Object.assign(
				settings?.supports?.spacing?.margin
					?.__experimentalDefaultControls || {},
				{ margin: true }
			),
		},
	};
	settings.attributes = {
		...settings?.attributes,
		style: { type: 'object' },
	};
	console.debug(
		`wp-cumulus-tools/block-filters/add-margin-support - Added margin support to ${ name }`
	);
	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'cmls/block-filters/add-margin-support',
	addSpacingSupportToBlocks
);

const addMarginStyleToBlocks = ( props, blockType, attributes ) => {
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
	'cmls/block-filters/add-margin-support',
	addSpacingSupportToBlocks
);

const addSpacingStyleToBlocks = createHigherOrderComponent(
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
	'cmls/block-filters/add-margin-support',
	addSpacingStyleToBlocks
);
