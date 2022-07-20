<?php

namespace Vendors\vena\AcfJson;

use Exception;
class Loader
{
    /**
     * @var array holder for defined groups
     */
    private $groups = [];
    /**
     * @var string Base path for acf-json folder
     */
    private $base_path = '';
    /**
     * @param array  $groups    ACF Group IDs
     * @param string $base_path Base path under which to store acf-json folder
     */
    public function __construct($groups, $base_path)
    {
        if (!$base_path) {
            throw new Exception('Base path must be provided for AcfJson');
        }
        $this->base_path = $base_path;
        $this->groups = $groups;
        \add_action('acf/update_field_group', [&$this, 'update_field_group'], 1, 1);
        \add_filter('acf/settings/load_json', [&$this, 'load_json'], 1, 1);
        \add_filter('acf/settings/save_json', [&$this, 'save_json'], 1, 1);
    }
    public function update_field_group($group)
    {
        if (\in_array($group['key'], $this->groups)) {
            \add_filter('acf/settings/save_json', [&$this, 'override_location'], 99999);
        }
        return $group;
    }
    public function override_location($path)
    {
        \remove_filter('acf/settings/save_json', [&$this, 'override_location'], 99999);
        $path = $this->base_path . '/acf-json';
        return $path;
    }
    public function save_json($path)
    {
        if (isset($_POST['acf_field_group']['key'])) {
            if (\in_array($_POST['acf_field_group']['key'], $this->groups)) {
                return $this->base_path . '/acf-json';
            }
        }
        return $path;
    }
    public function load_json($paths)
    {
        $paths[] = $this->base_path . '/acf-json';
        return $paths;
    }
}
