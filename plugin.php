<?php

namespace CUMULUS\Gutenberg\Tools;

/*
 * Plugin Name: Cumulus Wordpress Tools
 * Plugin URI: https://github.com/cumulus-digital/wp-cumulus-tools/
 * GitHub Plugin URI: https://github.com/cumulus-digital/wp-cumulus-tools/
 * Primary Branch: main
 * Description: Collection of Wordpress tools, blocks, block filters, and CPTs for Cumulus Media
 * Version: 0.0.1
 * Author: vena
 * License: UNLICENSED
 */

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

\define( 'BASEDIR', \plugin_dir_path( __FILE__ ) );

require BASEDIR . 'helpers.php';

/*
 * Install global editor assets
 */
\add_action( 'enqueue_block_editor_assets', function () {
	global $pagenow;

	if ( ! \is_admin() || 'widgets.php' === $pagenow ) {
		return;
	}
	$assets = include BASEDIR . 'build/editor.asset.php';
	\wp_enqueue_script(
		'wp-cumulus-blocks-editor',
		\plugins_url( 'build/editor.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version'],
		true
	);
} );

/**
 * Install global block filter assets
 * Nearly all of this can work in the widgets editor!
 */
\add_action('enqueue_block_editor_assets', function() {
	if ( ! \is_admin()) {
		return;
	}
	$assets = include BASEDIR . 'build/block-filters.asset.php';
	\wp_enqueue_script(
		'wp-cumulus-block-filters',
		\plugins_url( 'build/block-filters.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version'],
		true
	);
});

/*
 * Register our block category
 */
\add_filter( 'block_categories_all', function ( $categories ) {
	if ( ! \array_search( 'cmls', \array_column( $categories, 'slug' ) ) ) {
		$categories = \array_merge(
			$categories,
			[
				[
					'slug'  => 'cmls',
					'title' => 'Cumulus',
					'icon'  => null,
				],
			]
		);
	}

	return $categories;
}, 10, 1 );

/*
 * Runs all block installers
 */
\add_action( 'init', function () {
	$blockdirs = \glob( BASEDIR . 'blocks/*', \GLOB_ONLYDIR );

	foreach ( $blockdirs as $blockdir ) {
		$files = [
			'json'      => $blockdir . '/block.json',
			'installer' => $blockdir . '/install.php',
		];

		if ( \file_exists( $files['json'] ) ) {
			$json = \json_decode( \file_get_contents( $files['json'] ) );

			if ( ! $json || ! isset( $json->name ) ) {
				continue;
			}

			if ( is_block_registered( $json->name ) ) {
				continue;
			}

			if ( \file_exists( $files['installer'] ) ) {
				include $files['installer'];
			}
		}
	}
} );

/*
 * Runs all CPT intallers
 */
\add_action( 'init', function () {
} );
