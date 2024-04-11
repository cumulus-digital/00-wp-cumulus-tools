<?php
/**
 * Adds menu order to query loop ordering.
 */

namespace CUMULUS\Gutenberg\Tools\BlockFilters;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

// Filter a query loop block to add menu order
\add_filter( 'query_loop_block_query_vars', function ( $query, $block, $page ) {
	if ( empty( $query['post_type'] ) ) {
		return $query;
	}
	if ( ! \post_type_supports( $query['post_type'], 'page-attributes' ) ) {
		return $query;
	}
	$order = array(
		'menu_order' => 'ASC',
	);
	if ( ! empty( $query['orderby'] ) ) {
		if ( \is_array( $query['orderby'] ) ) {
			$order = \array_merge( $order, $query['orderby'] );
		} else {
			$dir = 'ASC';
			if ( ! empty( $query['order'] ) ) {
				$dir = $query['order'];
			}
			$order = \array_merge(
				$order,
				array( $query['orderby'] => $dir )
			);
		}
	}
	$query['orderby'] = $order;

	return $query;
}, 1, 3 );
