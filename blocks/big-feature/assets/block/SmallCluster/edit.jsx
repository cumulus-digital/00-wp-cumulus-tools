import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { globalBlockProps } from './utils';

const edit = ( props ) => {
	const blockProps = useBlockProps( globalBlockProps );
	const innerBlockProps = useInnerBlocksProps(
		{},
		{
			orientation: 'horizontal',
			template: [
				[
					'cumulus-gutenberg/big-feature-square',
					{ className: 'g-bf-small' },
				],
				[
					'cumulus-gutenberg/big-feature-square',
					{ className: 'g-bf-small' },
				],
			],
			templateLock: false, //'insert',
		}
	);
	return (
		<li { ...blockProps }>
			<ul>{ innerBlockProps.children }</ul>
		</li>
	);
};
export default edit;
