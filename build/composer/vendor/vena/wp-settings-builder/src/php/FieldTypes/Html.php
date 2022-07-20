<?php

// Outputs HTML directly, no field.
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Html
{
    use Generic;
    public function __construct($options)
    {
        $options['type'] = 'html';
        $options['title'] = empty($options['title']) ? '' : $options['title'];
        $args = empty($options['args']) ? array() : $options['args'];
        $options['args'] = \array_merge(array('label_for' => null), $args);
        if (!isset($options['id'])) {
            $options['id'] = \uniqid();
        }
        $this->traitConstructor($options);
    }
    public function outputField($args)
    {
        echo \wp_kses_post(empty($args['content']) ? '' : $args['content']);
    }
}
