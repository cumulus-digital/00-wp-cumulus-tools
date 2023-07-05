<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\Skeleton;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'skel' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/skel'
	);

	// Frontend stuff is getting enqueued when not needed for some reason
	function frontend_block_assets() {
		if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/skel' ) ) {
			\wp_dequeue_style( 'cumulus-gutenberg-skel-style' );
		}
	}
	\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );
}
