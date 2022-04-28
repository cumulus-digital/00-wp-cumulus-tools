<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\FamilyLinks;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

// Server-side renderer
\register_block_type(
	BASEDIR . '/build/blocks/family-links',
	[
		'render_callback' => __NAMESPACE__ . '\\renderCallback',
	]
);

require __DIR__ . '/rest-api.php';
require __DIR__ . '/server-side-render/index.php';
