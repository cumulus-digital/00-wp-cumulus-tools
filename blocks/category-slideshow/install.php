<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\CategorySlideshow;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'category-slideshow' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/category-slideshow',
		array(
			'render_callback' => __NAMESPACE__ . '\\do_render',
		)
	);

	// Frontend stuff is getting enqueued when not needed for some reason
	function frontend_block_assets() {
		if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/category-slideshow' ) ) {
			\wp_dequeue_style( 'cumulus-gutenberg-category-slideshow-style' );
		} elseif ( ! \is_admin() ) {
			/*
			\wp_add_inline_script(
				'cumulus-gutenberg-category-slideshow-view-script',
				'var crsg_category_slideshow = ' . \json_encode( array(
					// 'pluginDirPath' => \plugin_dir_path( __DIR__ ),
					// 'pluginDirUrl'  => \plugin_dir_url( __DIR__ ),
					'ajaxUrl' => \admin_url( 'admin-ajax.php' ),
				) ),
				'before'
			);
			 */
		}
	}
	\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );

	/*
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
	 */

	function do_render( $attributes, $content ) {
		$is_backend = \defined( 'REST_REQUEST' ) && true === REST_REQUEST && 'edit' === $_GET['context'];

		$output = '';

		if ( ! $is_backend ) {
			$output .= \vsprintf(
				'<div %s data-timeout="%s"><div>',
				array(
					\get_block_wrapper_attributes(),
					$attributes['timeout'],
				)
			);
		}

		$category = \array_key_exists( 'category', $attributes ) ? $attributes['category'] : 1;
		if ( ! \filter_var( $category, \FILTER_VALIDATE_INT ) || $category == 1 ) {
			return 'Invalid category.';
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

		if ( \count( $media ) === 0 ) {
			return 'No images found in this category.';
		}

		foreach ( $media as $image ) {
			$url = \esc_url( \wp_get_attachment_url( $image->ID ) );
			$alt = \get_post_meta( $image->ID, '_wp_attachment_image_alt', true );

			$output .= \vsprintf(
				'<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="%s" alt="%s" />',
				array( $url, $alt ? $alt : $image->post_title )
			);
		}

		if ( ! $is_backend ) {
			$output .= '</div></div>';
		}

		return $output;
	}

}
