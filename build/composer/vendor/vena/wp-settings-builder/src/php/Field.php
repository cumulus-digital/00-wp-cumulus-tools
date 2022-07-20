<?php

/**
 * Helper for constructing Wordpress settings fields.
 */
namespace Vendors\vena\WordpressSettingsBuilder;

class Field
{
    /**
     * @param string   $options[id]           Field ID
     * @param string   $options[title]        Field label
     * @param string   $options[option_group] Option group for field value. Defaults to [page_slug]
     * @param string   $options[option_name]  Option name for field value. Defaults to [id]
     * @param mixed    $options[default]      Optional. Default value to return when option has no stored value.
     * @param string   $options[page_slug]    Settings page slug
     * @param string   $options[section_id]   Settings section ID
     * @param function $options[callback]     Render callback for field. Types have built-in render callbacks by default.
     * @param array    $options[args]         Additional parameters to be output with field. Output as key="value" or "value" in absence of key.
     * @param string   $options[orientation]  Display orientation, should be 'column' or 'row'. Default is 'row'.
     *
     * @return mixed
     */
    public function __construct(array $options)
    {
        $type = 'text';
        if (isset($options['type'])) {
            $type = $options['type'];
        }
        if (\class_exists(__NAMESPACE__ . '\\FieldTypes\\' . \ucwords($type))) {
            $fieldClass = __NAMESPACE__ . '\\FieldTypes\\' . \ucwords($type);
        } else {
            $fieldClass = __NAMESPACE__ . '\\FieldTypes\\Text';
        }
        return new $fieldClass($options);
    }
}
