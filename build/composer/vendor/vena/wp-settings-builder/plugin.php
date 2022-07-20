<?php

namespace Vendors\vena\WordpressSettingsBuilder;

/*
 * Plugin Name: Settings Page Test
 * Description: This allows testing the Settings Builder class as a plugin.
 * Version: 1.0.7
 * Author: vena
 *
 * @author vena
 * @version 2.0.4
 */
require __DIR__ . '/vendor/autoload.php';
$settings = new Builder('Test Settings Title', 'Testing Menu', 'manage_options', 'my-settings', 9999);
$section = $settings->addSection('My/Section', 'My Section');
$section->addField(array('type' => 'text', 'id' => 'my/section/textfield', 'title' => 'Test text field', 'option_name' => 'test_text_field', 'args' => array('test', 'required')));
$section->addField(array('type' => 'email', 'id' => 'my/section/emailfield', 'title' => 'Test email field', 'option_name' => 'test_email_field', 'args' => array('test', 'required')));
$section->addField(array('type' => 'text', 'id' => 'my/section/textfield2', 'title' => 'Test text field 2', 'option_name' => 'test_text_field2', 'args' => array('test', 'style' => 'width: 500px')));
$section->addField(array('type' => 'select', 'id' => 'my/section/selectfield', 'title' => 'Test select field', 'option_name' => 'test_select_field', 'args' => array('options' => array(array('title' => 'test option 1', 'value' => 'one'), array('title' => 'test option 2', 'value' => 'two')))));
$section->addField(array('type' => 'select', 'id' => 'my/section/selectfieldgroup', 'title' => 'Test select field with optgroups', 'option_name' => 'test_select_field_optgroup', 'args' => array('options' => array(array('title' => 'Option group 1', 'options' => array(array('title' => 'optgroup 1 option 1', 'value' => 'one/one'), array('title' => 'optgroup 1 option 2', 'value' => 'one/two'))), array('title' => 'Option group 2', 'options' => array(array('title' => 'optgroup 2 option 1', 'value' => 'two/one'), array('title' => 'optgroup 2 option 2', 'value' => 'two/two')))))));
$section->addField(array('type' => 'checkbox', 'id' => 'my/section/checkbox1', 'title' => 'Test checkbox', 'option_name' => 'test_checkbox1', 'args' => array('no-margin' => \true)));
$section->addField(array('type' => 'checkbox', 'id' => 'my/section/checkbox2', 'title' => \true, 'option_name' => 'test_checkbox2', 'args' => array('title' => 'Testing label')));
$section->addField(array('type' => 'radio', 'id' => 'my/section/radio', 'title' => 'A Radio Group', 'option_name' => 'test_radio', 'default' => 'one', 'args' => array('options' => array(array('title' => 'Radio 1', 'value' => 'one'), array('title' => 'Radio 2', 'value' => 'two')))));
$section2 = $settings->addSection('My/Section2', 'My New Section');
$section2->addField(array('type' => 'html', 'args' => array('content' => '<h3>This is a test.</h3>')));
$section2->addField(array('type' => 'textarea', 'id' => 'my/section2/textarea', 'title' => 'A text area', 'option_name' => 'test_textarea'));
$section2->addField(array('type' => 'date', 'id' => 'my/section2/date', 'title' => 'A Date field (with a column orientation!)', 'option_name' => 'test_date', 'orientation' => 'column'));
$section2->addField(array('type' => 'html', 'args' => array('content' => '<h3>This is another test.</h3>')));
$section2->addField(array('type' => 'color', 'id' => 'my/section2/color', 'title' => 'A color field', 'option_name' => 'test_color'));
$section3 = $settings->addSection('My/Section3', 'Test array option name');
$section3->addField(array('type' => 'checkbox', 'id' => 'my/section3/checkbox1', 'title' => 'Test checkbox 1', 'option_name' => 'option_array[checkbox1]'));
$section3->addField(array('type' => 'checkbox', 'id' => 'my/section3/checkbox2', 'title' => 'Test checkbox 2', 'option_name' => 'option_array[checkbox2]'));
$section3->addField(array('type' => 'checkbox', 'id' => 'my/section3/checkbox3', 'title' => 'Test checkbox 3', 'option_name' => 'option_array[checkbox3]'));
$section3->addField(array('type' => 'checkbox', 'id' => 'my/section3/checkbox4', 'title' => 'Test checkbox 4', 'option_name' => 'option_array[checkbox4][testing]', 'default' => \true));
