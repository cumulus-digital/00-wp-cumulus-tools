<?php

namespace CUMULUS\Gutenberg\Tools;

/*
 * Plugin Name: Cumulus Wordpress Tools
 * Plugin URI: https://github.com/cumulus-digital/00-wp-cumulus-tools/
 * GitHub Plugin URI: https://github.com/cumulus-digital/00-wp-cumulus-tools/
 * Primary Branch: main
 * Description: Collection of Wordpress tools, blocks, block filters, and CPTs for Cumulus Media
 * Version: 1.1.14
 * Author: vena
 * License: UNLICENSED
 */

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

\define( 'CUMULUS\Gutenberg\Tools\PLUGIN', __FILE__ );
\define( 'CUMULUS\Gutenberg\Tools\BASEDIR', \plugin_dir_path( __FILE__ ) );
\define( 'CUMULUS\Gutenberg\Tools\BASEURL', \plugin_dir_url( __FILE__ ) );

require BASEDIR . 'helpers.php';

/*
 * Install global editor assets
 */
\add_action( 'enqueue_block_editor_assets', function () {
	global $pagenow;

	if ( ! \is_admin() || 'widgets.php' === $pagenow ) {
		return;
	}
	$assets = include \CUMULUS\Gutenberg\Tools\BASEDIR . 'build/editor.asset.php';
	\wp_enqueue_script(
		'wp-cumulus-tools-editor',
		\plugins_url( 'build/editor.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version'],
		true
	);
} );

/*
 * Install global block filter assets
 * Nearly all of this can work in the widgets editor!
 */
\add_action( 'enqueue_block_editor_assets', function () {
	if ( ! \is_admin() ) {
		return;
	}

	$assets = include \CUMULUS\Gutenberg\Tools\BASEDIR . 'build/block-filters.asset.php';
	\wp_enqueue_script(
		'wp-cumulus-tools-block-filters',
		\plugins_url( 'build/block-filters.js', __FILE__ ),
		$assets['dependencies'],
		$assets['version'],
		true
	);
} );

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
	$blockdirs = \glob(  \CUMULUS\Gutenberg\Tools\BASEDIR . 'blocks/*', \GLOB_ONLYDIR );

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
 * Runs all Block Filters support installers
 */
\add_action( 'init', function () {
	require \CUMULUS\Gutenberg\Tools\BASEDIR . '/block-filters/index.php';
} );

/*
 * Runs all CPT intallers
 */
\add_action( 'init', function () {
} );

/*
 * Run all utilities installers
 */
require \CUMULUS\Gutenberg\Tools\BASEDIR . '/utilities/index.php';
