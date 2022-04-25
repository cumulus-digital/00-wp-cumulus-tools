import { foreground as iconForeground } from './icon.jsx';
import metadata from '../../children.json';

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const globalBlockProps = { className: 'g-bf-column' };

registerBlockType( 'cumulus-gutenberg/big-feature-column', {
	...metadata,
	title: 'Big Feature Column',
	description: 'Column within a Big Feature',
	keywords: [ ...metadata.keywords, 'feature', 'box', 'column' ],
	parent: [ 'cumulus-gutenberg/big-feature' ],
	icon: {
		src: 'columns',
		foreground: iconForeground,
	},
	edit: ( props ) => {
		const blockProps = useBlockProps( globalBlockProps );
		const innerBlockProps = useInnerBlocksProps(
			{ title: 'Big Feature Column' },
			{
				template: [
					[
						'cumulus-gutenberg/big-feature-square',
						{ className: 'g-bf-big' },
					],
					[ 'cumulus-gutenberg/big-feature-small-cluster' ],
				],
				templateLock: false, //'insert',
			}
		);

		return <ul { ...blockProps }>{ innerBlockProps.children }</ul>;
	},
	save: () => {
		const blockProps = useBlockProps.save( globalBlockProps );
		return (
			<ul { ...blockProps }>
				<InnerBlocks.Content />
			</ul>
		);
	},
} );
