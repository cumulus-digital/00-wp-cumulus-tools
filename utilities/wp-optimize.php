<?php

namespace CUMULUS\Gutenberg\Tools\Utilities;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

/*
 * Enable showing advanced minify options
 */
if ( ! \defined( 'WP_OPTIMIZE_SHOW_MINIFY_ADVANCED' ) ) {
	\define( 'WP_OPTIMIZE_SHOW_MINIFY_ADVANCED', true );
}
