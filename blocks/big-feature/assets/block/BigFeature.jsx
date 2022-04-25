import BlockIcon from './icon.jsx';
import metadata from '../../block.json';

import './Column.jsx';
import './Square.jsx';
import './SmallCluster.jsx';

import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const globalBlockProps = { className: 'g-big-feature' };

registerBlockType( metadata.name, {
	icon: BlockIcon,
	edit: ( props ) => {
		const blockProps = useBlockProps( globalBlockProps );
		const innerBlockProps = useInnerBlocksProps(
			{},
			{
				template: [
					[ 'cumulus-gutenberg/big-feature-column' ],
					[ 'cumulus-gutenberg/big-feature-column' ],
					[ 'cumulus-gutenberg/big-feature-column' ],
				],
				templateLock: false, //'insert',
			}
		);

		return (
			<section { ...blockProps }>{ innerBlockProps.children }</section>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save( globalBlockProps );
		return (
			<section { ...blockProps }>
				<InnerBlocks.Content />
			</section>
		);
	},
} );
