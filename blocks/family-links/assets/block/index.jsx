import BlockIcon from './icon.jsx';
import metadata from '../../block.json';
import edit from './edit';

import { registerBlockType } from '@wordpress/blocks';

registerBlockType( metadata.name, {
	...metadata,
	icon: BlockIcon,
	edit: edit,
} );
