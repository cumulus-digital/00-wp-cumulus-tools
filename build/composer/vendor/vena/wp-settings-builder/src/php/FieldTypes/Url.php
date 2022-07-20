<?php

// Basic URL field
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Url
{
    use Generic;
    public function __construct($options)
    {
        $options['type'] = 'url';
        $options['args'] = \array_merge(array('placeholder' => 'https://example.com'), $options['args']);
        $this->traitConstructor($options);
    }
}
