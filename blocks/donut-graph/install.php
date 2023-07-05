<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\DonutGraph;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'donut-graph' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/donut-graph'
	);

	// Frontend stuff is getting enqueued when not needed for some reason
	function frontend_block_assets() {
		if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/donut-graph' ) ) {
			\wp_dequeue_style( 'cumulus-gutenberg-donut-graph-style' );
		}
	}
	\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );
}
