<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\CollapsableGroup;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'collapsable-group' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/collapsable-group'
	);
}
