<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\FamilyLinks;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'family-links' ) ) {
	// Server-side renderer
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/family-links',
		array(
			'render_callback' => __NAMESPACE__ . '\\renderCallback',
		)
	);

	require __DIR__ . '/rest-api.php';

	require __DIR__ . '/server-side-render/index.php';
}
