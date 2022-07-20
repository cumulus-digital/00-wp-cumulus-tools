<?php

// Basic text area field
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Textarea
{
    use Generic;
    public function __construct($options)
    {
        $options['type'] = 'textarea';
        $args = empty($options['args']) ? array() : $options['args'];
        $options['args'] = \array_merge(array('style' => 'resize:both', 'cols' => '80', 'rows' => '10'), $args);
        $this->traitConstructor($options);
    }
    public function outputField($args)
    {
        $value = null;
        if ($this->option_name !== null) {
            $value = $this->getValue();
        }
        ?>
		<textarea
			type="<?php 
        echo \esc_attr($this->type);
        ?>"
			id="<?php 
        echo \esc_attr($args['label_for']);
        ?>"
			name="<?php 
        echo \esc_attr($this->option_name);
        ?>"
			<?php 
        $this->outputFieldAttributes($args);
        ?>
		><?php 
        echo \esc_textarea($value);
        ?></textarea>
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
}
