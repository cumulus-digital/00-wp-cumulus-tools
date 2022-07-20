<?php

// Basic checkbox field
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Checkbox
{
    use Generic;
    public function __construct($options)
    {
        $settings = \array_merge(array('type' => 'checkbox'), $options);
        if (isset($options['option_args'])) {
            $settings['option_args'] = \array_merge(array(array('type' => 'boolean'), $options['option_args']));
        }
        $this->traitConstructor($settings);
    }
    public function outputField($args)
    {
        $value = null;
        if ($this->option_name !== null) {
            $value = $this->getValue();
        }
        ?>
		<label for="<?php 
        echo \esc_attr($args['label_for']);
        ?>">
			<input
				type="hidden"
				name="<?php 
        echo \esc_attr($this->option_name);
        ?>"
				value="0"
			/>
			<input
				type="<?php 
        echo \esc_attr($this->type);
        ?>"
				id="<?php 
        echo \esc_attr($args['label_for']);
        ?>"
				name="<?php 
        echo \esc_attr($this->option_name);
        ?>"
				value="1"
				<?php 
        if ($value === '1' || $value !== '0' && $this->default) {
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
        echo empty($args['title']) ? '' : \esc_html($args['title']);
        ?>
		</label>
		<?php 
    }
    /**
     * Returns an array of field args that should be ignored when
     * considering attributes for the field's html element.
     */
    private function getFieldAttributeIgnores()
    {
        return array('label_for', 'title');
    }
}
