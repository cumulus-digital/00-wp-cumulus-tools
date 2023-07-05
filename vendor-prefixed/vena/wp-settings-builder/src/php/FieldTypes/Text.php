<?php
// Basic text field

namespace CUMULUS\Gutenberg\Tools\Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Text {
	use Generic;

	public function __construct( $options ) {
		$this->traitConstructor( $options );
	}
}
