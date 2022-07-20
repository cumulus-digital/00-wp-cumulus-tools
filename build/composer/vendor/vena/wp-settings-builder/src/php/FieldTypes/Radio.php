<?php

// Basic radio field
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Radio
{
    use Generic;
    public function __construct($options)
    {
        $options['type'] = 'radio';
        if (empty($options['default'])) {
            \trigger_error('Radio FieldTypes should always have a default value.', \E_USER_WARNING);
        }
        $this->traitConstructor($options);
    }
    public function outputSingle($radio, $value)
    {
    }
    public function outputField($args)
    {
        $value = null;
        if ($this->option_name !== null) {
            $value = $this->getValue();
        }
        $index = 0;
        foreach ($args['options'] as $option) {
            ?>
				<?php 
            echo !isset($args['inline']) || $args['inline'] === \false ? '<p>' : '';
            ?>
				<label for="<?php 
            echo \esc_attr($args['label_for']);
            ?>[<?php 
            echo $index;
            ?>]">
					<input
						type="<?php 
            echo \esc_attr($this->type);
            ?>"
						id="<?php 
            echo \esc_attr($args['label_for']);
            ?>[<?php 
            echo $index;
            ?>]"
						name="<?php 
            echo \esc_attr($this->option_name);
            ?>"
						value="<?php 
            echo \esc_attr($option['value']);
            ?>"
						<?php 
            if ($value === $option['value']) {
                ?>
							checked
						<?php 
            }
            ?>
						<?php 
            $this->outputFieldAttributes($args);
            ?>
					/>
					<?php 
            echo empty($option['title']) ? '' : \esc_html($option['title']);
            ?>
				</label>
				<?php 
            echo !isset($args['inline']) || $args['inline'] === \false ? '<p>' : '';
            ?>
			<?php 
            ++$index;
        }
        if (isset($args['help'])) {
            ?>
			<div class="description help">
				<?php 
            if (\is_callable($args['help'])) {
                ?>
					<?php 
                \call_user_func($args['help']);
                ?>
				<?php 
            } else {
                ?>
					<?php 
                echo $args['help'];
                ?>
				<?php 
            }
            ?>
			</div>
		<?php 
        }
    }
    /**
     * Returns an array of field args that should be ignored when
     * considering attributes for the field's html element.
     */
    private function getFieldAttributeIgnores()
    {
        return array('label_for', 'options');
    }
}
