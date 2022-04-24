import metadata from '../../children.json';

const { registerBlockType } = wp.blocks;
const {
	useBlockProps,
	BlockControls,
	InspectorControls,
	InnerBlocks,
} = wp.blockEditor;
const { Flex, FlexItem, Dashicon } = wp.components;
const { useEffect, useState } = wp.element;
const { useSelect } = wp.data;

const Icons = {
	plus: {
		expand: 'plus',
		collapse: 'minus',
	},
	arrows: {
		expand: 'arrow-down-alt2',
		collapse: 'arrow-up-alt2',
	},
};

registerBlockType( 'cumulus-gutenberg/collapsable-group-header', {
	...metadata,
	icon: {
		foreground: '#00588d',
		src: 'heading',
	},
	name: 'cumulus-gutenberg/collapsable-group-header',
	title: 'Collapsable Group Header',
	description: 'Header for a collapsable group.',
	keywords: [ ...metadata.keywords, 'header' ],

	attributes: {
		bodyId: {
			type: 'string',
			source: 'attribute',
			selector: 'header',
			attribute: 'aria-controls',
		},
		mobileExpandIcon: {
			type: 'string',
		},
	},

	usesContext: [
		'cmls-collapse-group/bodyId',
		'cmls-collapse-group/mobileExpandIcon',
	],

	edit: ( props ) => {
		const { attributes, setAttributes, context, clientId } = props;

		useEffect( () => {
			const newAttribs = {};
			if (
				attributes.bodyId !== context[ 'cmls-collapse-group/bodyId' ]
			) {
				newAttribs.bodyId = context[ 'cmls-collapse-group/bodyId' ];
			}
			if (
				attributes.mobileExpandIcon !==
				context[ 'cmls-collapse-group/mobileExpandIcon' ]
			) {
				newAttribs.mobileExpandIcon =
					context[ 'cmls-collapse-group/mobileExpandIcon' ];
			}
			if ( Object.values( newAttribs ).length ) {
				setAttributes( newAttribs );
			}
		}, [
			context[ 'cmls-collapse-group/bodyId' ],
			context[ 'cmls-collapse-group/mobileExpandIcon' ],
		] );

		// In the editor, we need to get the editor's own ID for the body
		// block in order to properly assign aria-controls for the header
		const bodyClientId = useSelect( ( select ) => {
			const parentBlockId = select(
				'core/block-editor'
			).getBlockParentsByBlockName(
				clientId,
				'cumulus-gutenberg/collapsable-group'
			);
			if ( parentBlockId ) {
				const parentBlock = select(
					'core/block-editor'
				).getBlocksByClientId(
					parentBlockId[ parentBlockId.length - 1 ]
				);
				if ( parentBlock && parentBlock.length ) {
					const bodyBlock = parentBlock[ 0 ].innerBlocks.filter(
						( block ) => {
							return (
								block?.name ===
								'cumulus-gutenberg/collapsable-group-body'
							);
						}
					);
					if ( bodyBlock && bodyBlock.length ) {
						return bodyBlock[ bodyBlock.length - 1 ].clientId;
					}
				}
			}
			return null;
		}, [] );

		const blockProps = useBlockProps( {
			'aria-controls': `block-${ bodyClientId }`,
		} );
		return (
			<header { ...blockProps }>
				<div className="wp-block-cumulus-gutenberg-collapsable-group-header-content">
					<InnerBlocks
						template={ [
							[
								'core/post-title',
								{
									fontSize: 'normal',
									style: {
										typography: {
											fontStyle: 'normal',
											fontWeight: '400',
										},
									},
									isLink: false,
								},
							],
						] }
						templateLock={ false }
					/>
				</div>
				<div
					className="wp-block-cumulus-gutenberg-collapsable-group-header-icon"
					data-icon={ attributes.mobileExpandIcon }
				>
					<span />
				</div>
			</header>
		);
	},
	save: ( props ) => {
		const { attributes } = props;
		const blockProps = useBlockProps.save( {
			'aria-controls': attributes.bodyId,
		} );
		return (
			<header { ...blockProps }>
				<div className="wp-block-cumulus-gutenberg-collapsable-group-header-content">
					<InnerBlocks.Content />
				</div>
				<div
					className="wp-block-cumulus-gutenberg-collapsable-group-header-icon"
					data-icon={ attributes.mobileExpandIcon }
				>
					<span />
				</div>
			</header>
		);
	},
} );
