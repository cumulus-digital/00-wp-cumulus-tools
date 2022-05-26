import Toolbar from './toolbar';
import Inspector from './inspector';
import metadata from '../../block.json';

import { Spinner } from '@wordpress/components';
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

import CmlsServerSideRender from 'Components/CmlsServerSideRender.jsx';

const MySpinner = () => {
	return (
		<>
			<Spinner />
			<small>Loading Family&hellip;</small>
		</>
	);
};

const edit = ( props ) => {
	const blockProps = useBlockProps();

	const { attributes } = props;

	const { currentPostId, parentPostId } = useSelect( ( select ) => {
		return {
			currentPostId: select( 'core/editor' ).getCurrentPostId(),
			parentPostId: select( 'core/editor' ).getEditedPostAttribute(
				'parent'
			),
		};
	} );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<Toolbar { ...props } />
			</BlockControls>
			<InspectorControls>
				<Inspector { ...props } />
			</InspectorControls>

			{ attributes.parentPostId === null ? (
				<MySpinner />
			) : (
				<CmlsServerSideRender
					block={ metadata.name }
					attributes={ attributes }
					urlQueryArgs={ {
						'attributes[parentPostId]':
							attributes.parentPostId !== undefined
								? attributes.parentPostId
								: parentPostId,
						post_id: currentPostId,
					} }
					LoadingResponsePlaceholder={ MySpinner }
				/>
			) }
		</div>
	);
};

export default edit;
