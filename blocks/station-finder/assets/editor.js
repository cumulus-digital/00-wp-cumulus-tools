import './editor.scss';

import metadata from '../block.json';
import StationFinderIcon from './icon.jsx';

const { registerBlockType } = wp.blocks;
const { useBlockProps, BlockControls, InspectorControls } = wp.blockEditor;

registerBlockType( metadata.name, {
	...metadata,
	icon: StationFinderIcon,
	edit: ( props ) => {
		const blockProps = useBlockProps();

		return (
			<div { ...blockProps }>
				<div class="example">Station Finder Placeholder</div>
			</div>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save();
		return (
			<div { ...blockProps }>
				<div class="crsg-sf-loading"></div>
			</div>
		);
	},
} );
