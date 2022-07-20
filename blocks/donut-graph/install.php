<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\DonutGraph;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'donut-graph' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/donut-graph'
	);
}
