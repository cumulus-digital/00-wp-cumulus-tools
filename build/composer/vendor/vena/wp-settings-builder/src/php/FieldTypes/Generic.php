<?php

// Base class which all field types should extend.
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

trait Generic
{
    private $id = 'WSB/section/field';
    private $title = 'Field';
    private $callback;
    private $option_group;
    private $option_name;
    private $default = \false;
    private $page_slug = 'settings';
    private $section_id = 'WSB/section';
    private $args = array();
    private $option_args = array('type' => 'string', 'show_in_rest' => \true);
    /**
     * Construct a field's options.
     *
     * @param string   $options[id]           Field ID
     * @param string   $options[title]        Field label
     * @param string   $options[option_group] Option group for field value. Defaults to [page_slug]
     * @param string   $options[option_name]  Option name for field value. Defaults to [id]
     * @param mixed    $options[default]      Optional. Default value to return when option has no stored value.
     * @param string   $options[page_slug]    Settings page slug
     * @param string   $options[section_id]   Settings section ID
     * @param function $options[callback]     Render callback for field. Types have built-in render callbacks by default.
     * @param array    $options[args]         Additional parameters to be output with field. Output as key="value" or "value" in absence of key.
     * @param array    $options[option_args]  Additional arguments for register_setting. Note that setting a 'default' key here will override the base 'default' setting.
     */
    public function traitConstructor($options)
    {
        $defaults = array('id' => 'WSB/section/field', 'title' => 'Field', 'option_group' => null, 'option_name' => null, 'page_slug' => 'settings', 'section_id' => 'WSB/section', 'callback' => array($this, 'outputField'), 'orientation' => 'row', 'args' => array(), 'option_args' => array());
        $settings = \array_merge($defaults, $options);
        if (isset($settings['type'])) {
            $settings['args']['field_type'] = $settings['type'];
        }
        if (isset($settings['orientation'])) {
            $settings['args']['orientation'] = $settings['orientation'];
        }
        if (!$settings['option_group']) {
            $settings['option_group'] = $settings['page_slug'];
        }
        if ($settings['option_name'] === null && $settings['option_name'] !== \false) {
            $settings['option_name'] = $settings['id'];
        }
        if (empty($settings['args']['label_for'])) {
            $settings['args']['label_for'] = $settings['id'];
        }
        $settings['option_args'] = \array_merge($this->option_args, isset($settings['option_args']) ? $settings['option_args'] : array());
        // Any 'default' key in option_args will overrule any base 'default' setting
        if (isset($settings['default'])) {
            if (isset($settings['option_args'], $settings['option_args']['default'])) {
                $settings['default'] = $settings['option_args']['default'];
            } else {
                $settings['option_args'] = \array_merge(array('default' => $settings['default']), isset($settings['option_args']) ? $settings['option_args'] : array());
            }
        } elseif (isset($settings['option_args'], $settings['option_args']['default'])) {
            $settings['default'] = $settings['option_args']['default'];
        }
        foreach ($settings as $key => $val) {
            $this->{$key} = $val;
        }
        \add_action('admin_init', array($this, 'initField'));
    }
    public function initField()
    {
        if ($this->option_name) {
            $option = $this->parseOptionName();
            if ($option && isset($option['name'])) {
                \register_setting($this->option_group, $option['name'], $this->option_args);
            }
        }
        \add_settings_field($this->id, $this->title, $this->callback, $this->page_slug, $this->section_id, $this->args);
    }
    /**
     * Returns an array of args that are appropriate for attributes on the field's html element.
     *
     * @param mixed $args
     */
    public function getFieldAttributes($args)
    {
        $ignore = $this->getFieldAttributeIgnores();
        return \array_filter($args, function ($key, $arg) use($ignore) {
            if (\in_array($key, $ignore, \true) || \in_array($arg, $ignore, \true)) {
                return \false;
            }
            return \true;
        }, \ARRAY_FILTER_USE_BOTH);
    }
    /**
     * Outputs attributes for the field's html element.
     *
     * @param mixed $args
     */
    public function outputFieldAttributes($args)
    {
        foreach ($this->getFieldAttributes($args) as $key => $val) {
            if (\is_numeric($key)) {
                echo \esc_html($val) . "\n";
            } else {
                if (\in_array($key, array('field_type', 'orientation'), \true)) {
                    $key = "data-{$key}";
                }
                echo \esc_html($key) . '="' . \esc_attr($val) . '"' . "\n";
            }
        }
    }
    public function getValue()
    {
        $option = $this->parseOptionName();
        if (!$option) {
            return $this->default;
        }
        $value = \get_option($option['name']);
        // Immediately send default if get_option returns false
        if ($value === \false) {
            return $this->default;
        }
        // Handle key access for array-based options
        if ($option['type'] === 'array') {
            // make sure the returned value is actually an array with items
            if (!\is_array($value) || !\count($value)) {
                return $this->default;
            }
            // If we have keys, access them, otherwise we'll later return the full array
            if (isset($option['keys']) && \count($option['keys'])) {
                $temp = $value;
                foreach ($option['keys'] as $key) {
                    if (\array_key_exists($key, $temp)) {
                        $temp = $temp[$key];
                    } else {
                        return $this->default;
                    }
                }
                return $temp;
            }
        }
        return $value;
    }
    public function outputField($args)
    {
        $value = null;
        if ($this->option_name !== null) {
            $value = $this->getValue();
        }
        ?>
		<input
			type="<?php 
        echo \esc_attr($this->type);
        ?>"
			value="<?php 
        echo \esc_attr($value);
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
		/>
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
    private function parseOptionName()
    {
        if ($this->option_name) {
            // parse array names
            if (\preg_match('/^(?<name>[\\w\\-]+)\\[.*\\]$/', $this->option_name, $name) && isset($name['name'])) {
                $option = array('type' => 'array', 'name' => $name['name'], 'keys' => null);
                if (\preg_match_all('/\\[(?<keys>[\\w\\-]+)\\]/', $this->option_name, $keys) && isset($keys['keys'])) {
                    $option['keys'] = $keys['keys'];
                }
                return $option;
            }
            return array('type' => 'single', 'name' => $this->option_name);
        }
        return null;
    }
    /**
     * Returns an array of field args that should be ignored when
     * considering attributes for the field's html element.
     */
    private function getFieldAttributeIgnores()
    {
        return array('label_for', 'help');
    }
}
