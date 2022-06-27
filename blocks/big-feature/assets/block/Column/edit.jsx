import { globalBlockProps } from './utils';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const edit = ( props ) => {
	const blockProps = useBlockProps( globalBlockProps );
	const innerBlockProps = useInnerBlocksProps(
		{ title: 'Big Feature Column' },
		{
			template: [
				[ 'cumulus-gutenberg/big-feature-square' ],
				[ 'cumulus-gutenberg/big-feature-small-cluster' ],
			],
			templateLock: false, //'insert',
		}
	);

	return <ul { ...blockProps }>{ innerBlockProps.children }</ul>;
};

export default edit;
