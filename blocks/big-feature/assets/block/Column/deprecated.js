import { globalBlockProps } from './utils';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const deprecated = [
	{
		save( props ) {
			const blockProps = useBlockProps.save( {
				className: 'g-bf-container',
			} );
			return (
				<ul { ...blockProps }>
					<InnerBlocks.Content />
				</ul>
			);
		},
	},
];

export default deprecated;
