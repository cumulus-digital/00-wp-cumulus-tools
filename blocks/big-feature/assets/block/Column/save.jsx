import { globalBlockProps } from './utils';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const save = () => {
	const blockProps = useBlockProps.save( globalBlockProps );
	return (
		<ul { ...blockProps }>
			<InnerBlocks.Content />
		</ul>
	);
};

export default save;
