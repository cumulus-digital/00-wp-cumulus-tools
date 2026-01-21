<?php
/**
 * @license MIT
 *
 * Modified by __root__ on 21-January-2026 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
// Basic checkbox field

namespace CUMULUS\Gutenberg\Tools\Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Checkbox {
	use Generic;

	public function __construct( $options ) {
		$settings = \array_merge(
			array( 'type' => 'checkbox' ),
			$options
		);

		if ( isset( $options['option_args'] ) ) {
			$settings['option_args'] = \array_merge( array(
				array( 'type' => 'boolean' ),
				$options['option_args'],
			) );
		}

		$this->traitConstructor( $settings );
	}

	public function outputField( $args ) {
		$value = null;

		if ( $this->option_name !== null ) {
			$value = $this->getValue();
		}
		?>

		<?php if ( !array_key_exists('value', $args) ): ?>
		<input
			type="hidden"
			name="<?php echo \esc_attr( $this->option_name ); ?>"
			value="0"
		/>
		<?php endif; ?>

		<?php if (!empty($args['options'])): ?>

			<?php foreach ( $args['options'] as $option ): ?>
				<?php
					$label_for = \esc_attr( $args['label_for'] . '-' . sanitize_title($option['value']) );
				?>
				<p>
					<label for="<?php echo $label_for ?>">
						<input
							type="<?php echo \esc_attr( $this->type ); ?>"
							id="<?php echo $label_for ?>"
							name="<?php echo \esc_attr( $this->option_name ); ?>"
							value="<?php echo \esc_attr( $option['value'] ); ?>"
							<?php if ( \substr( $this->option_name, -2 ) === '[]' && is_array($value) ): ?>
								<?php if ( \in_array( $option['value'], $value ) ): ?>
									checked
								<?php endif; ?>
							<?php elseif ( $value === $option['value'] ): ?>
								checked
							<?php endif; ?>
							<?php $this->outputFieldAttributes( $args ); ?>
						/>
						<?php echo empty( $option['title'] ) ? '' : \esc_html( $option['title'] ); ?>
					</label>
				</p>
			<?php endforeach; ?>

		<?php else: ?>

			<label for="<?php echo \esc_attr( $args['label_for'] ); ?>">
				<input
					type="<?php echo \esc_attr( $this->type ); ?>"
					id="<?php echo \esc_attr( $args['label_for'] ); ?>"
					name="<?php echo \esc_attr( $this->option_name ); ?>"
					value="<?php if ( array_key_exists( 'value', $args ) ) { echo \esc_attr( $args['value'] ); } else { echo '1'; } ?>"
					<?php if ( $value === '1' || ( $value !== '0' && $this->default ) ): ?>
						checked
					<?php endif; ?>
					<?php $this->outputFieldAttributes( $args ); ?>
				/>
				<?php echo empty( $args['title'] ) ? '' : \esc_html( $args['title'] ); ?>
			</label>

		<?php endif; ?>

		<?php
	}

	/**
	 * Returns an array of field args that should be ignored when
	 * considering attributes for the field's html element.
	 */
	private function getFieldAttributeIgnores() {
		return array( 'label_for', 'title', 'options', 'inline' );
	}
}
