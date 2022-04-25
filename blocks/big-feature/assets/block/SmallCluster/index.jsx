import { foreground as iconForeground } from '../icon.jsx';
import metadata from '../../../children.json';
import edit from './edit';
import save from './save';

import { registerBlockType } from '@wordpress/blocks';

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
	edit: edit,
	save: save,
} );
