import { formatMedia } from './utils';

import { image as imageIcon } from '@wordpress/icons';
import { Icon } from '@wordpress/components';
import {
	MediaReplaceFlow,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/blockEditor';
import {} from '@wordpress/url';

export const MediaUploader = ( props ) => {
	const { attributes, setAttributes, mediaSize } = props;
	return (
		<MediaUploadCheck>
			<MediaUpload
				title="Big Feature Square"
				label="Square Image"
				type="image"
				allowedTypes={ [ 'image' ] }
				value={ attributes.mediaId }
				onSelect={ ( val ) => {
					setAttributes( formatMedia( val, mediaSize ) );
				} }
				{ ...props }
			/>
		</MediaUploadCheck>
	);
};

export const MediaReplacer = ( { attributes, setAttributes, mediaSize } ) => {
	return (
		<MediaReplaceFlow
			mediaId={ attributes.mediaId }
			mediaURL={ attributes.mediaUrl }
			allowedTypes={ [ 'image' ] }
			accept="image/*"
			onSelect={ ( val ) => {
				setAttributes( formatMedia( val, mediaSize ) );
			} }
			label="Replace image"
			title="Replace image"
			showTooltip={ true }
			name={
				<>
					<Icon icon={ imageIcon } />
					Replace
				</>
			}
		/>
	);
};
