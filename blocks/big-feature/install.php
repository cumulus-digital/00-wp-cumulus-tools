<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\BigFeature;

use function CUMULUS\Gutenberg\Tools\contains_block;

// Frontend stuff is getting enqueued when not needed for some reason
\add_action( 'enqueue_block_assets', function () {
	// We never need view script for this block, it's only in block.json
	// for @wordpress/scripts webpack pipeline.
	$args = ['view_script' => null];

	if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/big-feature' ) ) {
		$args['style'] = null;
	}
	\register_block_type(
		BASEDIR . '/build/blocks/big-feature',
		$args
	);
} );
