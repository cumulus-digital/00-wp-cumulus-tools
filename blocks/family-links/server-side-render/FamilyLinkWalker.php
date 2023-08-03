<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\FamilyLinks;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

class FamilyLinkWalker extends \Walker_Page {
	protected $current_object_id = 0;

	protected $is_backend = false;

	public function __construct() {
		$this->is_backend = \defined( 'REST_REQUEST' ) && true === REST_REQUEST && 'edit' === \filter_input( \INPUT_GET, 'context', \FILTER_SANITIZE_STRING );

		if ( $this->current_object_id === 0 ) {
			if ( isset( $_GET['post_id'] ) ) {
				$this->current_object_id = $_GET['post_id'];
			} else {
				$this->current_object_id = \get_the_ID();
			}
		}
	}

	public function start_el( &$output, $data_object, $depth = 0, $args = array(), $current_object_id = 0 ) {
		$newOutput = '';

		parent::start_el( $newOutput, $data_object, $depth, $args, $this->current_object_id );

		/*
		if ( $this->is_backend ) {
			$newOutput = \str_replace( '<a ', '<a onclick="event.preventDefault();" ', $newOutput );
		}
		 */

		$output .= $newOutput;
	}
}
