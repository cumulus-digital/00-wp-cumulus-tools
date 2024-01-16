import metadata from '../../children.json';

import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

registerBlockType( 'cumulus-gutenberg/collapsable-group-body', {
	...metadata,
	icon: {
		foreground: '#00588d',
		src: 'format-aside',
	},
	name: 'cumulus-gutenberg/collapsable-group-body',
	title: 'Collapsable Group Body',
	description: 'Body for a collapsable group.',
	keywords: [ ...metadata.keywords, 'body' ],

	attributes: {
		anchor: {
			type: 'string',
			source: 'attribute',
			selector: 'div.wp-block-cumulus-gutenberg-collapsable-group-body',
			attribute: 'id',
		},
	},

	usesContext: [ 'cmls-collapse-group/bodyId' ],

	edit: ( props ) => {
		const { context, attributes, setAttributes } = props;

		useEffect( () => {
			if (
				attributes.anchor !== context[ 'cmls-collapse-group/bodyId' ]
			) {
				setAttributes( {
					anchor: context[ 'cmls-collapse-group/bodyId' ],
				} );
			}
		}, [ context[ 'cmls-collapse-group/bodyId' ] ] );

		const blockProps = useBlockProps();
		return (
			<div
				{ ...blockProps }
				data-anchor={ context[ 'cmls-collapse-group/bodyId' ] }
			>
				<InnerBlocks
					template={ [
						[
							'core/paragraph',
							//{ placeholder: 'Add to group body…' },
						],
					] }
					templateLock={ false }
					directInsert={ true }
					defaultBlock="core/paragraph"
				/>
			</div>
		);
	},
	save: ( props ) => {
		const { attributes } = props;
		const blockProps = useBlockProps.save( { id: attributes.anchor } );
		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
