<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\BigFeature;

use function CUMULUS\Gutenberg\Tools\contains_block;

\register_block_type(
	\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/big-feature',
	[
		'view_script' => null,
	]
);

// Frontend stuff is getting enqueued when not needed for some reason
function frontend_block_assets() {
	if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/big-feature' ) ) {
		\wp_dequeue_style( 'cumulus-gutenberg-big-feature-style' );
	}
}
\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );
