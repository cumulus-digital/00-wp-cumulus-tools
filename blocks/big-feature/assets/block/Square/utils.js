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
 * @param {object} media,
 * @param {string|array} size
 * @return {object}
 */
export const formatMedia = ( media, size = 'large' ) => {
	let sizedMedia = media;
	const hasSize = ( media, size ) => {
		if ( media?.sizes?.[ size ] ) {
			return media.sizes[ size ];
		} else if ( media?.media_details?.sizes?.[ size ] ) {
			return {
				...media.media_details.sizes[ size ],
				url: media.media_details.sizes[ size ].source_url,
			};
		} else {
			return false;
		}
	};
	if ( Array.isArray( size ) ) {
		size.some( ( s ) => {
			const ret = hasSize( media, s );
			if ( ret ) {
				sizedMedia = ret;
				return true;
			}
		} );
	} else {
		const ret = hasSize( media, size );
		if ( ret ) {
			sizedMedia = ret;
		}
	}

	const alt = media?.alt;

	console.log( 'MEDIA', size, sizedMedia );

	return {
		mediaUrl: stripDomain( sizedMedia.url ),
		mediaId: media.id,
		alt: alt || '',
		mediaDimensions: { width: sizedMedia.width, height: sizedMedia.height },
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
