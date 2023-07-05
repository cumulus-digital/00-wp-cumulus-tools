import { foreground as iconForeground } from '../icon.jsx';
import metadata from './square.block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated.jsx';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( metadata.name, {
	...metadata,
	icon: {
		src: 'format-image',
		foreground: iconForeground,
	},
	edit: edit,
	save: save,
	deprecated: deprecated,
} );
