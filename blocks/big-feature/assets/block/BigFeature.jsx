import BlockIcon from './icon.jsx';
import metadata from '../../block.json';

import './Column';
import './Square';
import './SmallCluster';

import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InnerBlocks,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { InspectorControls } from '@wordpress/blockEditor';
import {
	Panel,
	PanelBody,
	PanelRow,
	ToggleControl,
} from '@wordpress/components';

const globalBlockProps = { className: 'g-big-feature' };

registerBlockType( metadata.name, {
	...metadata,
	icon: BlockIcon,
	edit: ( props ) => {
		const blockProps = useBlockProps( globalBlockProps );
		const { attributes, setAttributes } = props;
		const innerBlockProps = useInnerBlocksProps(
			{},
			{
				template: [
					[ 'cumulus-gutenberg/big-feature-column' ],
					[ 'cumulus-gutenberg/big-feature-column' ],
					[ 'cumulus-gutenberg/big-feature-column' ],
				],
				templateLock: false, //'insert',
			}
		);

		return (
			<>
				<InspectorControls>
					<Panel>
						<PanelBody>
							<PanelRow>
								<ToggleControl
									label="Lazy Load Images"
									checked={ attributes.lazyLoad }
									onChange={ ( val ) =>
										setAttributes( {
											lazyLoad: val,
										} )
									}
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
				</InspectorControls>
				<section { ...blockProps }>
					{ innerBlockProps.children }
				</section>
			</>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save( globalBlockProps );
		return (
			<section { ...blockProps }>
				<InnerBlocks.Content />
			</section>
		);
	},
} );
