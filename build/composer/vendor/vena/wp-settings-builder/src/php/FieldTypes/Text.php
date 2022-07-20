<?php

// Basic text field
namespace Vendors\vena\WordpressSettingsBuilder\FieldTypes;

class Text
{
    use Generic;
    public function __construct($options)
    {
        $this->traitConstructor($options);
    }
}
