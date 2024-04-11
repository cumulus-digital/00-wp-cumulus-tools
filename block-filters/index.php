<?php

namespace CUMULUS\Gutenberg\Tools\BlockFilters;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

// Server-side support for block filters.
require __DIR__ . '/search/index.php';
require __DIR__ . '/ajax-query-loop/index.php';
require __DIR__ . '/query-loop-add-menu-order/index.php';
