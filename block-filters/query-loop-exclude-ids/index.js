/**
 * Allow for excluding post IDs in query loops
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { FormTokenField } from '@wordpress/components';

const addContextToCoreQuery = ( settings, name ) => {
	if ( name !== 'core/query' ) {
		return settings;
	}

	return Object.assign( {}, settings, {
		usesContext: Array.isArray( settings?.usesContext )
			? [ ...settings.usesContext, 'postId' ]
			: [ 'postId' ],
	} );
};
addFilter(
	'blocks.registerBlockType',
	'cmls/block-filters/query/filters/exclude-ids',
	addContextToCoreQuery
);

/**
 * Inspector controls
 */
const withExcludeIds = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// Do nothing if it's not our block
		if ( props.name !== 'core/query' ) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes, isSelected } = props;

		if ( ! props?.context?.postId ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockEdit { ...props } />
				{ isSelected && (
					<InspectorControls>
						<PanelBody
							title="Exclude IDs"
							initialOpen={ !! attributes.query.exclude?.length }
						>
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
									newQ.exclude = newQ.exclude.filter(
										( i ) => i !== pId
									);
									if ( val ) {
										newQ.exclude.push( pId );
									}
									setAttributes( {
										query: {
											...attributes.query,
											...newQ,
										},
									} );
								} }
							/>
							<FormTokenField
								label="Excluded IDs"
								value={ attributes.query.exclude }
								onChange={ ( tokens ) =>
									setAttributes( {
										query: {
											...attributes.query,
											...{
												exclude: tokens.filter( ( t ) =>
													isNumber( t )
												),
											},
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
	withExcludeIds
);
