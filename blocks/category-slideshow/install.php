<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\CategorySlideshow;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'category-slideshow' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/category-slideshow'
	);

	// Frontend stuff is getting enqueued when not needed for some reason
	function frontend_block_assets() {
		if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/category-slideshow' ) ) {
			\wp_dequeue_style( 'cumulus-gutenberg-category-slideshow-style' );
		}
	}
	\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );

	// Ajax handler for retrieving images
	function ajax_handler() {
		$category = \json_decode( $_GET['category'], true );
		if ( ! \filter_var( $category, \FILTER_VALIDATE_INT ) || $category == 1 ) {
			\header( 'HTTP/1.0 400 Bad error' );

			exit( '{ error: "Bad category." }' );
		}

		$args = array(
			'category'       => $category,
			'post_type'      => 'attachment',
			'post_mime_type' => 'image/*',
			'post_status'    => array( 'inherit', 'publish' ),
			'numberposts'    => 20,
			'posts_per_page' => 20,
		);
		$media = \get_posts( $args );

		if ( ! empty( $_GET['callback'] ) ) {
			exit( $_GET['callback'] . '(' . \json_encode( $media ) . ');' );
		}

		exit( \json_encode( $media ) );
	}
	\add_action( 'wp_ajax_get_media_by_category', __NAMESPACE__ . '\\ajax_handler' );
	\add_action( 'wp_ajax_nopriv_get_media_by_category', __NAMESPACE__ . '\\ajax_handler' );

}
