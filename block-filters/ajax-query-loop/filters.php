<?php

namespace CUMULUS\Gutenberg\Tools\BlockFilters;

use function CUMULUS\Gutenberg\Tools\contains_block;

/*
 * Filter a query loop block to deal with ajax options
 */
\add_filter( 'render_block', function ( $content, $block ) {
	if (
		$block['blockName'] !== 'core/query' || ! isset( $block['attrs']['useAjax'] ) || ! $block['attrs']['useAjax']
	) {
		return $content;
	}

	$query_id      = $block['attrs']['queryId'];
	$container_end = \mb_strpos( $content, '>' );

	$paged = \absint( $_GET[ 'query-' . $query_id . '-page' ] ?? 1 );

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
 * AJAX function render more posts.
 */
function query_pagination_render_more_query() {
	$block = \json_decode( \stripslashes( $_REQUEST['block'] ), true );
	$paged = ! empty( $_REQUEST['paged'] ) ? \intval( $_REQUEST['paged'] ) : 1;

	if ( $block ) {
		$_GET['query-' . $block['attrs']['queryId'] . '-page'] = $paged;
		//$block['attrs']['query']['offset'] = $block['attrs']['query']['perPage'] * $paged;

		echo \render_block( $block );
	}

	exit;
}
\add_action( 'wp_ajax_query_render_more_pagination', __NAMESPACE__ . '\query_pagination_render_more_query' );
\add_action( 'wp_ajax_nopriv_query_render_more_pagination', __NAMESPACE__ . '\query_pagination_render_more_query' );

\add_action( 'enqueue_block_assets', function () {
	if ( contains_block( 'core/query' ) && ! \is_admin() ) {
		\wp_enqueue_script(
			'core-query-ajax-handler',
			BASEURL . 'block-filters/ajax-query-loop/handle_ajax.js',
			['jquery'],
			false,
			true
		);
		\wp_localize_script(
			'core-query-ajax-handler',
			'core_query_ajax_handler',
			['url' => \admin_url( 'admin-ajax.php' )]
		);
		\wp_enqueue_style(
			'core-query-ajax-handler',
			BASEURL . 'block-filters/ajax-query-loop/handle_ajax.css'
		);
	}
} );
