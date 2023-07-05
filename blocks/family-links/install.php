<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\FamilyLinks;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'family-links' ) ) {
	// Server-side renderer
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/family-links',
		array(
			'render_callback' => __NAMESPACE__ . '\\renderCallback',
		)
	);

	// Frontend stuff is getting enqueued when not needed for some reason
	function frontend_block_assets() {
		if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/family-links' ) ) {
			\wp_dequeue_style( 'cumulus-gutenberg-family-links-style' );
		}
	}
	\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );

	require __DIR__ . '/rest-api.php';

	require __DIR__ . '/server-side-render/index.php';
}
