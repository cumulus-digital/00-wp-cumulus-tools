/**
 * Add an attribute and toggle for using ajax with query loop pagination
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelRow, ToggleControl } from '@wordpress/components';
import { InspectorAdvancedControls } from '@wordpress/block-editor';

const addAttributesToCoreQuery = ( settings, name ) => {
	if ( name !== 'core/query' ) {
		return settings;
	}

	return Object.assign( {}, settings, {
        attributes: Object.assign( {}, settings.attributes, {
            useAjax: { type: 'boolean', default: false }
        } ),
    } );
};
addFilter(
	'blocks.registerBlockType',
	'cmls/block-filters/query/filters/ajax',
	addAttributesToCoreQuery
);

/**
 * Inspector controls
 */
const withAjaxToggle = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's not our block
		if ( props.name !== 'core/query' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes, isSelected } = props;

		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorAdvancedControls>
						<PanelRow>
							<ToggleControl
								label="Use Ajax Pagination"
								help="Pagination reloads the block in place instead of reloading the page"
								checked={!!attributes.useAjax}
								onChange={(val) => setAttributes({ useAjax: !attributes.useAjax })}
							/>
						</PanelRow>
					</InspectorAdvancedControls>
				) }
			</>
		);
	};
});
addFilter(
	'editor.BlockEdit',
	'cmls/block-filters/query/filters/ajax',
	withAjaxToggle
);

const saveAjaxAttribute = ( extraProps, blockType, attributes ) => {
    // Do nothing if it's another block than our defined ones.
	if (blockType.name !== 'core/query') {
		return extraProps;
	}

	extraProps.className = extraProps.className.replace(/\s*uses?\-ajax\s*/, '');
	if (attributes.useAjax) {
		extraProps.className += ' uses-ajax';
	}

    return extraProps;

};
wp.hooks.addFilter(
    'blocks.getSaveContent.extraProps',
    'cmls/block-filters/query/filters/ajax',
    saveAjaxAttribute
);