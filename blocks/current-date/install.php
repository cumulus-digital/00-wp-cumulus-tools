<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\CurrentDate;

use function CUMULUS\Gutenberg\Tools\contains_block;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

if ( \CUMULUS\Gutenberg\Tools\Settings::isBlockActivated( 'current-date' ) ) {
	\register_block_type(
		\CUMULUS\Gutenberg\Tools\BASEDIR . '/build/blocks/current-date',
		array(
			'render_callback' => __NAMESPACE__ . '\\do_render',
		)
	);

	// Frontend stuff is getting enqueued when not needed for some reason
	function frontend_block_assets() {
		if ( ! \is_admin() && ! contains_block( 'cumulus-gutenberg/current-date' ) ) {
			\wp_dequeue_style( 'cumulus-gutenberg-current-date-style' );
		}
	}
	\add_action( 'wp_head', __NAMESPACE__ . '\\frontend_block_assets', 1 );

	function do_render( $attributes, $content ) {

		$format = $attributes['format'];
		if ( \mb_stripos( $format, '[' ) !== false && \mb_stripos( $format, ']' ) !== false ) {
			// Match text within square brackets
			$pattern = '/\[([^\]]+)\]/';

			// Replace square-bracketed text with escaped characters
			$formatted = \preg_replace_callback( $pattern, function ( $matches ) {
				// Escape each character inside the brackets
				return '\\' . \implode( '\\', \mb_str_split( $matches[1] ) );
			}, $format );
			$format = $formatted;
		}

		try {
			return '<time datetime="' . \esc_attr( \wp_date( 'c' ) ) . '" ' . \get_block_wrapper_attributes() . '>' . \wp_date( $format ) . '</time>';
		} catch ( \Exception $e ) {
			return 'Invalid date format.';
		}
	}
}
