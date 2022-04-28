<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\FamilyLinks;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

class Assets {

	public static $url;

	public static $path;
}
Assets::$path = BASEDIR . '/build/blocks/family-links/assets';
Assets::$url  = BASEURL . 'build/blocks/family-links/assets';

// Editor Assets
function editor_assets() {
	if ( ! \is_post_type_hierarchical( \get_post_type() ) && \get_post_type() !== 'wp_block' ) {
		return;
	}

	\wp_enqueue_style(
		'gutenberg_family_links-css',
		Assets::$url . '/editor.css'
	);

	$assets = include \plugin_dir_path( __FILE__ ) . 'build/backend.asset.php';
	\wp_enqueue_script(
		'gutenberg_family_links-backend-js', // Handle.
		Assets::$url . '/editor.js',
		$assets['dependencies'],
		$assets['version'],
		true
	);
}
\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\editor_assets' );

// Frontend Assets
function frontend_block_assets() {
	if ( contains_block( 'cumulus-gutenberg/family-links' ) && ! \is_admin() ) {

		// Block assets
		\wp_enqueue_style(
			'gutenberg_family_links-css',
			Assets::$url . '/editor.css'
		);
	}
}
\add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\frontend_block_assets' );
