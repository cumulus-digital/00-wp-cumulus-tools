import { foreground as iconForeground } from '../icon.jsx';
import metadata from '../../../children.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import { registerBlockType } from '@wordpress/blocks';

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
	edit: edit,
	save: save,
	deprecated: deprecated,
} );
