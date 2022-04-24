import AnchorIcon from './icon.jsx';
import metadata from '../../block.json';

const { registerBlockType } = wp.blocks;
const { TextControl, ExternalLink, PanelBody, PanelRow } = wp.components;
const { __ } = wp.i18n;
const { useBlockProps, InspectorControls } = wp.blockEditor;
const { Platform } = wp.element;

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

const ANCHOR_SCHEMA = {
	type: 'string',
	source: 'attribute',
	attribute: 'id',
	selector: '*',
};

registerBlockType(metadata.name, {
	icon: AnchorIcon,
	edit: ( props ) => {
		const blockProps = useBlockProps();
		const { attributes } = props;
		const { anchor } = attributes;
		const isWeb = Platform.OS === 'web';

		return (
			<div { ...blockProps }>
				<InspectorControls initialOpen={ true }>
					<PanelBody>
						<PanelRow>
							<TextControl
								className="html-anchor-control"
								label={ __( 'HTML anchor' ) }
								help={
									<>
										{ __(
											'Enter a word or two — without spaces — to make a unique web address just for this block, called an “anchor.” Then, you’ll be able to link directly to this section of your page.'
										) }

										{ isWeb && (
											<ExternalLink
												href={ __(
													'https://wordpress.org/support/article/page-jumps/'
												) }
											>
												{ __(
													'Learn more about anchors'
												) }
											</ExternalLink>
										) }
									</>
								}
								value={ props.attributes.anchor || '' }
								placeholder={
									! isWeb ? __( 'Add an anchor' ) : null
								}
								onChange={ ( nextValue ) => {
									nextValue = nextValue.replace(
										ANCHOR_REGEX,
										'-'
									);
									props.setAttributes( {
										anchor: nextValue,
									} );
								} }
								autoCapitalize="none"
								autoComplete="off"
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div>
					{AnchorIcon.src}
					<div>{anchor && <em>{anchor}</em>}</div>
				</div>
			</div>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save({
			className: 'cmls-anchor'
		});
		return <div { ...blockProps }></div>;
	},
} );
