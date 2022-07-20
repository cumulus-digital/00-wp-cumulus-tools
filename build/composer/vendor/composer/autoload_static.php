<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite01547afc961bea939e1ffdb582f8fcb
{
    public static $prefixLengthsPsr4 = array (
        'V' => 
        array (
            'Vendors\\vena\\WordpressSettingsBuilder\\' => 38,
            'Vendors\\vena\\AcfJson\\' => 21,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Vendors\\vena\\WordpressSettingsBuilder\\' => 
        array (
            0 => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php',
        ),
        'Vendors\\vena\\AcfJson\\' => 
        array (
            0 => __DIR__ . '/..' . '/vena/acf-json/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
        'Vendors\\vena\\AcfJson\\Loader' => __DIR__ . '/..' . '/vena/acf-json/src/Loader.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\Builder' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/Builder.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\Field' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/Field.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Checkbox' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Checkbox.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Email' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Email.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Generic' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Generic.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Html' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Html.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Radio' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Radio.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Select' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Select.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Text' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Text.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Textarea' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Textarea.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\FieldTypes\\Url' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/FieldTypes/Url.php',
        'Vendors\\vena\\WordpressSettingsBuilder\\Section' => __DIR__ . '/..' . '/vena/wp-settings-builder/src/php/Section.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite01547afc961bea939e1ffdb582f8fcb::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite01547afc961bea939e1ffdb582f8fcb::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInite01547afc961bea939e1ffdb582f8fcb::$classMap;

        }, null, ClassLoader::class);
    }
}