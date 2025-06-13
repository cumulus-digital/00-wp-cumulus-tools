<?php

namespace CUMULUS\Gutenberg\Tools\Shortcodes\CurrentDate;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

function current_date_shortcode( $attr ) {
	$attr = \shortcode_atts( array(
		'format' => 'n/j/y',
	), $attr, 'current-date' );
	$now = new \DateTime();

	try {
		return '<time datetime="' . \esc_attr( $now->format( 'c' ) ) . '">' . \wp_date( $attr['format'] ) . '</time>';
	} catch ( \Exception $e ) {
		return 'Invalid date format.';
	}
}
\add_shortcode( 'current-date', __NAMESPACE__ . '\\current_date_shortcode' );
