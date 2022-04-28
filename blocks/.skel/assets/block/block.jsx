import BlockIcon from './icon.jsx';
import metadata from '../../block.json';

const { registerBlockType } = wp.blocks;
const { useBlockProps, BlockControls, InspectorControls } = wp.blockEditor;

registerBlockType( metadata.name, {
	...metadata,
	icon: BlockIcon,
	edit: ( props ) => {
		const blockProps = useBlockProps();

		return <div { ...blockProps }>Testing!</div>;
	},
	save: () => {
		const blockProps = useBlockProps.save();
		return <div { ...blockProps }>Testing!</div>;
	},
} );
