<?php

namespace CUMULUS\Gutenberg\Tools\Utilities;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

// Runs utility entries
require __DIR__ . '/wp-optimize.php';

require __DIR__ . '/collapse-hierarchical/index.php';
require __DIR__ . '/jetpack-extras/index.php';
require __DIR__ . '/obscure-feed-authors/index.php';
