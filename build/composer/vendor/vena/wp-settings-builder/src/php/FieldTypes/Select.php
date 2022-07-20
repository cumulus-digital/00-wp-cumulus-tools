<?php

// Basic select field
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Select
{
    use Generic;
    public function __construct($options)
    {
        if (empty($options['args'] || empty($options['args']['options']))) {
            throw new \RuntimeException('Select FieldTypes must have an "options" array in its "args" parameter.');
        }
        $options['type'] = 'select';
        $this->traitConstructor($options);
    }
    public function outputField($args)
    {
        $value = null;
        if ($this->option_name !== null) {
            $value = $this->getValue();
        }
        ?>
		<select
			id="<?php 
        echo \esc_attr($args['label_for']);
        ?>"
			name="<?php 
        echo \esc_attr($this->option_name);
        ?>"
			<?php 
        $this->outputFieldAttributes($args);
        ?>
		>
			<option><?php 
        echo empty($args['no_value']) ? '' : \esc_html($args['no_value']);
        ?></option>
			<?php 
        foreach ($args['options'] as $option) {
            ?>
				<?php 
            $this->outputOption($option, $value);
            ?>
			<?php 
        }
        ?>
		</select>
		<?php 
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
        return array('label_for', 'options', 'help');
    }
    private function outputOption($option, $value)
    {
        if (empty($option['options'])) {
            ?>
				<option
					value="<?php 
            echo \esc_attr($option['value']);
            ?>"
					<?php 
            if ($value === $option['value']) {
                ?>
						selected
					<?php 
            }
            ?>
				>
						<?php 
            echo \esc_html($option['title']);
            ?>
				</option>
			<?php 
        } elseif (\is_array($option['options'])) {
            ?>
				<optgroup label="<?php 
            echo empty($option['title']) ? '' : \esc_attr($option['title']);
            ?>">
					<?php 
            foreach ($option['options'] as $optGroupOptions) {
                ?>
						<?php 
                $this->outputOption($optGroupOptions, $value);
                ?>
					<?php 
            }
            ?>
				</optgroup>
			<?php 
        }
    }
}
