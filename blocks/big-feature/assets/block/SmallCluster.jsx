import { foreground as iconForeground } from './icon.jsx';
import metadata from '../../children.json';

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const globalBlockProps = { className: 'g-bf-cluster' };

registerBlockType( 'cumulus-gutenberg/big-feature-small-cluster', {
	...metadata,
	title: 'Big Feature Small Cluster',
	description: 'Cluster of small boxes in a Big Feature Column',
	keywords: [ ...metadata.keywords, 'box' ],
	parent: [ 'cumulus-gutenberg/big-feature-column' ],
	icon: {
		src: 'columns',
		foreground: iconForeground,
	},
	edit: ( props ) => {
		const blockProps = useBlockProps( globalBlockProps );
		const innerBlockProps = useInnerBlocksProps(
			{},
			{
				orientation: 'horizontal',
				template: [
					[
						'cumulus-gutenberg/big-feature-square',
						{ className: 'g-bf-small' },
					],
					[
						'cumulus-gutenberg/big-feature-square',
						{ className: 'g-bf-small' },
					],
				],
				templateLock: false, //'insert',
			}
		);
		return (
			<li { ...blockProps }>
				<ul>{ innerBlockProps.children }</ul>
			</li>
		);
	},
	save: ( props ) => {
		const blockProps = useBlockProps.save( globalBlockProps );
		return (
			<li { ...blockProps }>
				<ul>
					<InnerBlocks.Content />
				</ul>
			</li>
		);
	},
} );
