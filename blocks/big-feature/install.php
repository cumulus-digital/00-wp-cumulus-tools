<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\BigFeature;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'big-feature' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/big-feature',
		array(
			'view_script_handles' => null,
		)
	);

	// Add medium_large size back
	\add_filter( 'image_size_names_choose', function ( $sizes ) {
		if ( \array_key_exists( 'medium_large', $sizes ) ) {
			return $sizes;
		}

		return \array_merge( $sizes, array(
			'medium_large' => \__( 'Medium Large' ),
		) );
	} );

	// Frontend stuff is getting enqueued when not needed for some reason
	function frontend_block_assets() {
		if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/big-feature' ) ) {
			\wp_dequeue_style( 'cumulus-gutenberg-big-feature-style' );
		}
	}
	\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );
}
