<?php

namespace CUMULUS\Gutenberg\Tools;

/*
 * Plugin Name: Cumulus Wordpress Tools
 * Plugin URI: https://github.com/cumulus-digital/00-wp-cumulus-tools/
 * GitHub Plugin URI: https://github.com/cumulus-digital/00-wp-cumulus-tools/
 * Primary Branch: main
 * Description: Collection of Wordpress tools, blocks, block filters, and CPTs for Cumulus Media
 * Version: 1.7.1
 * Author: vena
 * License: UNLICENSED
 * Requires at least: 6.3
 */

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

\define( 'CUMULUS\Gutenberg\Tools\PLUGIN', __FILE__ );
\define( 'CUMULUS\Gutenberg\Tools\BASEDIR', \plugin_dir_path( __FILE__ ) );
\define( 'CUMULUS\Gutenberg\Tools\BASEURL', \plugin_dir_url( __FILE__ ) );

require BASEDIR . '/vendor-prefixed/autoload.php';

require BASEDIR . 'helpers.php';

// Register settings menu.
require BASEDIR . '/settings.php';

// Install global editor assets
\add_action( 'enqueue_block_editor_assets', function () {
	global $pagenow;

	if ( ! \is_admin() || $pagenow === 'widgets.php' ) {
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

// Register our block category
\add_filter( 'block_categories_all', function ( $categories ) {
	if ( ! \array_search( 'cmls', \array_column( $categories, 'slug' ), true ) ) {
		$categories = \array_merge(
			$categories,
			array(
				array(
					'slug'  => 'cmls',
					'title' => 'Cumulus',
					'icon'  => null,
				),
			)
		);
	}

	return $categories;
}, 10, 1 );

// Runs all block installers
\add_action( 'init', function () {
	$blockdirs = \glob(  \CUMULUS\Gutenberg\Tools\BASEDIR . 'blocks/*', \GLOB_ONLYDIR );

	foreach ( $blockdirs as $blockdir ) {
		$files = array(
			'json'      => $blockdir . '/block.json',
			'installer' => $blockdir . '/install.php',
		);

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

// Runs all Block Filters support installers
\add_action( 'init', function () {
	require \CUMULUS\Gutenberg\Tools\BASEDIR . '/block-filters/index.php';
} );

// Runs all CPT intallers
\add_action( 'init', function () {
} );

// Run all utilities installers
require \CUMULUS\Gutenberg\Tools\BASEDIR . '/utilities/index.php';

// Run all shortcode installers
require \CUMULUS\Gutenberg\Tools\BASEDIR . '/shortcodes/index.php';

// Register activation hooks
\register_activation_hook( \CUMULUS\Gutenberg\Tools\PLUGIN, function () {
	$callbacks = (array) \apply_filters( 'wp-cumulus-tools--on-activation', array() );
	foreach ( $callbacks as $callback ) {
		\call_user_func( $callback );
	}

	// Register uninstall hooks
	\register_uninstall_hook( \CUMULUS\Gutenberg\Tools\PLUGIN, __NAMESPACE__ . '\\handleUninstall' );
} );

function handleUninstall() {
	// Override settings and run deactivation hooks
	Settings::overrideClearOnDeactivation();
	$deactivators = (array) \apply_filters( 'wp-cumulus-tools--on-deactivation', array() );
	foreach ( $deactivators as $callback ) {
		\call_user_func( $callback );
	}
}

// Register deactivation hooks
\register_deactivation_hook( \CUMULUS\Gutenberg\Tools\PLUGIN, function () {
	$callbacks = (array) \apply_filters( 'wp-cumulus-tools--on-deactivation', array() );
	foreach ( $callbacks as $callback ) {
		\call_user_func( $callback );
	}
} );
