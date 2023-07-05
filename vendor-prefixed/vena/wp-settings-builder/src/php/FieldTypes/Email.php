<?php
// Basic email field

namespace CUMULUS\Gutenberg\Tools\Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Email {
	use Generic;

	public function __construct( $options ) {
		$options['type'] = 'email';
		$options['args'] = \array_merge(
			array( 'placeholder' => 'user@example.com' ),
			$options['args']
		);
		$this->traitConstructor( $options );
	}
}
