/**
 * Allow for excluding post IDs in query loops
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { FormTokenField } from '@wordpress/components';

const updateCoreQuerySettings = ( settings, name ) => {
	if ( name !== 'core/query' ) {
		return settings;
	}

	const newSettings = settings;

	// Add postId to context
	if (
		! newSettings?.usesContext?.length ||
		! newSettings.usesContext.includes( 'postId' )
	) {
		newSettings.usesContext = [ ...newSettings?.usesContext, 'postId' ];
	}

	return newSettings;
};
addFilter(
	'blocks.registerBlockType',
	'cmls/block-filters/query/filters/exclude-ids',
	updateCoreQuerySettings
);

/**
 * Inspector controls
 */
const coreQueryExcludeInspector = createHigherOrderComponent( ( BlockEdit ) => {
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
					<InspectorControls>
						<PanelBody
							title="Exclude IDs"
							initialOpen={ !! attributes.query.exclude?.length }
						>
							{ props.context?.postId && (
								<ToggleControl
									label="Exclude This Page"
									help="Adds the current post ID to excluded IDs."
									checked={
										attributes.query.exclude?.length
											? attributes.query.exclude.includes(
													props.context.postId
											  )
											: false
									}
									onChange={ ( val ) => {
										const newQ = attributes.query;
										const pId = props.context.postId;
										if ( isNumber( pId ) ) {
											newQ.exclude = [
												...new Set( [
													...newQ.exclude,
													pId,
												] ),
											];
										}
										setAttributes( {
											query: {
												...attributes.query,
												...newQ,
											},
										} );
									} }
								/>
							) }
							<FormTokenField
								label="Excluded IDs"
								value={ attributes.query.exclude }
								onChange={ ( tokens ) =>
									setAttributes( {
										query: {
											...attributes.query,
											exclude: [
												...new Set(
													tokens.filter( ( t ) =>
														isNumber( t )
													)
												),
											],
										},
									} )
								}
							/>
						</PanelBody>
					</InspectorControls>
				) }
			</>
		);
	};
} );
addFilter(
	'editor.BlockEdit',
	'cmls/block-filters/query/filters/exclude-ids',
	coreQueryExcludeInspector
);
