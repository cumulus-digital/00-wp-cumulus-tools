import {
	getAuthority,
	getPathAndQueryString,
	getFragment,
} from '@wordpress/url';

import metadata from './square.block.json';

export const stripDomain = ( url ) => {
	const authority = getAuthority( url );
	if (
		authority &&
		authority.toLowerCase().includes( window.location.host.toLowerCase() )
	) {
		const path = getPathAndQueryString( url ) || '';
		const fragment = getFragment( url ) || '';
		return path + fragment;
	}
	return url;
};

/**
 * When media is available, return the largest size and alt attribute
 * @param {object} media
 * @return {object}
 */
export const formatMedia = ( media ) => {
	// Try to get the largest media size available
	const src =
		media?.sizes?.full?.url ||
		media?.media_details?.sizes?.full?.source_url;
	const alt = media?.alt;
	return {
		mediaUrl: stripDomain( src || media.url ),
		mediaId: media.id,
		alt: alt || '',
		mediaDimensions: { width: media.width, height: media.height },
	};
};

/**
 * Determine if an attribute is set to its default value
 * @param {object} attributes
 * @param {string} key
 * @returns {boolean}
 */
export const isDefault = ( attributes, key ) => {
	return !! (
		metadata.attributes[ key ].hasOwnProperty( 'default' ) &&
		attributes[ key ] == metadata.attributes[ key ].default
	);
};

/**
 * Reset attributes to their default values.
 */
export const resetAttributes = ( { attributes, setAttributes } ) => {
	const newAttr = {};
	for ( const key in attributes ) {
		newAttr[ key ] = metadata.attributes[ key ].default;
	}
	setAttributes( newAttr );
};
