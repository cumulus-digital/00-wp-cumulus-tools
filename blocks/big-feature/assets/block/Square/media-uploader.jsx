import { formatMedia } from './utils';

import { image as imageIcon } from '@wordpress/icons';
import { Icon } from '@wordpress/components';
import {
	useBlockProps,
	BlockControls,
	InspectorControls,
	MediaReplaceFlow,
	MediaPlaceholder,
	MediaUpload,
	MediaUploadCheck,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/blockEditor';
import {
	filterURLForDisplay,
	safeDecodeURI,
	getAuthority,
	getPathAndQueryString,
	getFragment,
} from '@wordpress/url';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { useState, useEffect } from '@wordpress/element';

export const MediaUploader = ( props ) => {
	const { attributes, setAttributes } = props;
	return (
		<MediaUploadCheck>
			<MediaUpload
				title="Big Feature Square"
				label="Square Image"
				type="image"
				allowedTypes={ [ 'image' ] }
				value={ attributes.mediaId }
				onSelect={ ( val ) => {
					setAttributes( formatMedia( val ) );
				} }
				{ ...props }
			/>
		</MediaUploadCheck>
	);
};

export const MediaReplacer = ( { attributes, setAttributes } ) => {
	return (
		<MediaReplaceFlow
			mediaId={ attributes.mediaId }
			mediaURL={ attributes.mediaUrl }
			allowedTypes={ [ 'image' ] }
			accept="image/*"
			onSelect={ ( val ) => {
				setAttributes( formatMedia( val ) );
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
