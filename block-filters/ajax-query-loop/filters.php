<?php

namespace CUMULUS\Gutenberg\Tools\BlockFilters;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

// Filter a query loop block to deal with ajax options
\add_filter( 'render_block', function ( $content, $block ) {
	if (
		$block['blockName'] !== 'core/query' || ! isset( $block['attrs']['useAjax'] ) || ! $block['attrs']['useAjax']
	) {
		return $content;
	}

	$query_id      = $block['attrs']['queryId'];
	$container_end = \mb_strpos( $content, '>' );

	$paged = \absint( $_GET['query-' . $query_id . '-page'] ?? 1 );

	$content = \substr_replace(
		$content,
		' data-query-id="' . \esc_attr( $query_id ) . '"' .
		' data-paged="' . \esc_attr( $paged ) . '"' .
		' data-block="' . \esc_attr( \json_encode( $block ) ) . '"',
		$container_end,
		0
	);

	return $content;
}, 10, 2 );

/**
 * WP_Query "where" filter to remove any post statuses that
 * are not "publish" since AJAX calls may include others.
 *
 * @param mixed $where
 */
function filter_unpublished( $where ) {
	global $wpdb;
	\preg_match_all(
		'/OR\s*' . $wpdb->posts . '\.post_status\s*=\s*[\'\"][^\'\"]+[\'\"]/',
		$where,
		$statuses
	);

	$replace = array();

	if ( $statuses && \count( $statuses ) ) {
		$statuses = $statuses[0];
		$replace  = \array_filter( $statuses, function ( $status ) {
			return \mb_strpos( $status, 'publish' ) === false;
		} );
	}

	return \str_replace( $replace, '', $where );
}

// Handle rendering of new pages
function query_pagination_render_more_query() {
	$block = \json_decode( \stripslashes( $_REQUEST['block'] ), true );
	$paged = ! empty( $_REQUEST['paged'] ) ? \intval( $_REQUEST['paged'] ) : 1;
	$post  = null;

	if ( $block ) {
		// If we don't rewrite the context, wordpress will render this block
		// as if the page was admin_ajax.php!
		if ( isset( $_REQUEST['post_id'] ) ) {
			$post_id = \intval( $_REQUEST['post_id'] );

			if ( $post_id ) {
				$newPost = \get_post( $post_id );

				if ( $newPost ) {
					global $post;
					$post = $newPost;
					\setup_postdata( $post );
					// this could get messy...
					$_SERVER['REQUEST_URI'] = \get_permalink( $post );
				}
			}
		}
		$_GET['query-' . $block['attrs']['queryId'] . '-page'] = $paged;

		\add_filter( 'posts_where', __NAMESPACE__ . '\\filter_unpublished', \PHP_INT_MAX, 1 );
		echo \render_block( $block );
		\remove_filter( 'posts_where', __NAMESPACE__ . '\\filter_unpublished', \PHP_INT_MAX );
	}

	if ( $post ) {
		\wp_reset_postdata();
	}
	\wp_die();
}
\add_action( 'wp_ajax_query_render_more_pagination', __NAMESPACE__ . '\\query_pagination_render_more_query' );
\add_action( 'wp_ajax_nopriv_query_render_more_pagination', __NAMESPACE__ . '\\query_pagination_render_more_query' );

\add_action( 'enqueue_block_assets', function () {
	if ( contains_block( 'core/query' ) && ! \is_admin() ) {
		\wp_enqueue_script(
			'core-query-ajax-handler',
			\CUMULUS\Gutenberg\Tools\BASEURL . 'block-filters/ajax-query-loop/handle_ajax.js',
			array( 'jquery' ),
			false,
			true
		);
		\wp_localize_script(
			'core-query-ajax-handler',
			'core_query_ajax_handler',
			array(
				'url'     => \admin_url( 'admin-ajax.php' ),
				'post_id' => \get_the_ID(),
			)
		);
		\wp_enqueue_style(
			'core-query-ajax-handler',
			\CUMULUS\Gutenberg\Tools\BASEURL . 'block-filters/ajax-query-loop/handle_ajax.css'
		);
	}
} );
