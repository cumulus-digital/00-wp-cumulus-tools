<?php

/**
 * Helper for constructing Wordpress settings sections.
 */
namespace Vendors\vena\WordpressSettingsBuilder;

class Section
{
    private $id;
    private $title;
    private $callback;
    private $page_slug;
    private $fields = array();
    public function __construct($id = 'WSB/section', $title = 'Section', $callback = null, $page_slug = 'wsb-settings')
    {
        $this->id = $id;
        $this->title = $title;
        $this->page_slug = $page_slug;
        $this->callback = $callback;
        \add_action('admin_init', array($this, 'initSection'));
    }
    public function initSection()
    {
        \add_settings_section($this->id, $this->title, $this->callback, $this->page_slug);
    }
    public function getId()
    {
        return $this->id;
    }
    /**
     * Add a field to this section.
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
     * @param string   $options[orientation]  Display orientation, should be 'column' or 'row'. Default is 'row'.
     */
    public function addField($options)
    {
        if (empty($options['page_slug'])) {
            $options['page_slug'] = $this->page_slug;
        }
        if (empty($options['section_id'])) {
            $options['section_id'] = $this->id;
        }
        $field = new Field($options);
        \array_push($this->fields, $field);
        return $field;
    }
}
