import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { globalBlockProps } from './utils';

const save = ( props ) => {
	const blockProps = useBlockProps.save( globalBlockProps );
	return (
		<li { ...blockProps }>
			<ul>
				<InnerBlocks.Content />
			</ul>
		</li>
	);
};

export default save;
