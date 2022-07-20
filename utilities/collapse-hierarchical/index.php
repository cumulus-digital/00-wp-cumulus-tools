<?php

namespace CUMULUS\Gutenberg\Tools\Utilities\CollapseHierarchical;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isToolActivated( 'collapse-hierarchical' ) ) {
	\add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\initCollapseHierarchical' );
}

function initCollapseHierarchical() {
	if ( ! \is_admin() ) {
		return;
	}

	$screen = \get_current_screen();

	// Only operate where appropriate
	if (
		! $screen
		|| $screen->is_block_editor()
		|| ! \in_array( $screen->base, array( 'edit', 'edit-tags' ), true )
	) {
		return;
	}

	$is_hierarchical = false;
	$view_type       = null;

	if ( $screen->base === 'edit' ) {
		$view_type       = 'post';
		$is_hierarchical = \is_post_type_hierarchical( $screen->post_type );
	}

	if ( $screen->base === 'edit-tags' ) {
		$view_type       = 'tax';
		$is_hierarchical = \is_taxonomy_hierarchical( $screen->taxonomy );
	}

	if ( $is_hierarchical ) {
		\add_filter( 'admin_body_class', function ( $classes ) use ( $view_type ) {
			if ( \mb_strstr( $classes, 'wp-cmls-collapsable' ) === false ) {
				$classes .= " wp-cmls-collapsable wp-cmls-collapsable-{$view_type}";
			}

			return $classes;
		} );

		$assets = include \CUMULUS\Gutenberg\Tools\BASEDIR . '/build/utilities/collapse-hierarchical/index.asset.php';

		\wp_enqueue_script(
			'collapse-hierarchical-backend-script',
			\CUMULUS\Gutenberg\Tools\BASEURL . '/build/utilities/collapse-hierarchical/index.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);

		\wp_enqueue_style(
			'collapse-hierarchical-backend-style',
			\CUMULUS\Gutenberg\Tools\BASEURL . '/build/utilities/collapse-hierarchical/index.css',
			array(),
			$assets['version'],
			'screen'
		);
	}
}
