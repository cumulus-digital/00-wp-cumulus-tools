<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\Anchor;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'anchor' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/anchor'
	);
}
