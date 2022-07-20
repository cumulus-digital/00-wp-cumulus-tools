<?php

/**
 * Helper for constructing WordPress settings pages.
 */
namespace Vendors\vena\WordpressSettingsBuilder;

\define('Vendors\\vena\\WordpressSettingsBuilder\\BUILDDIR', __DIR__ . '/../../build');
/**
 * Main builder class for generating WordPress settings pages.
 */
class Builder
{
    /**
     * Settings page title.
     *
     * @var string
     */
    private $page_title;
    /**
     * Settings page menu title.
     *
     * @var string
     */
    private $menu_title;
    /**
     * Capability needed to access settings page.
     *
     * @var string
     */
    private $capability;
    /**
     * Slug name to refer to the menu by (should be unique).
     *
     * @var string
     */
    private $menu_slug;
    /**
     * Position in menu order.
     *
     * @var int
     */
    private $position;
    /**
     * Holds defined sections for this page.
     *
     * @var array
     */
    private $sections = array();
    /**
     * Instantiate the settings page.
     *
     * @param string $page_title title of the settings page
     * @param string $menu_title title used in admin menu
     * @param string $capability capability required to access settings page
     * @param string $menu_slug  slug name to refer to the menu by (should be unique for this page)
     * @param int    $position   position in the menu order for this page
     */
    public function __construct($page_title = 'Settings', $menu_title = 'Settings', $capability = 'manage_options', $menu_slug = 'wsb-settings', $position = 0)
    {
        $this->page_title = $page_title;
        $this->menu_title = $menu_title;
        $this->capability = $capability;
        $this->menu_slug = $menu_slug;
        $this->position = $position;
        \add_action('admin_menu', array($this, 'initPage'));
        \add_action('current_screen', array($this, 'enqueueAssets'));
    }
    public function enqueueAssets()
    {
        if (!\is_admin()) {
            return;
        }
        $screen = \get_current_screen();
        if (!isset($screen->id) || 'settings_page_' . $this->menu_slug !== $screen->id) {
            return;
        }
        $assets = (include \plugin_dir_path(\realpath(BUILDDIR . '/index.asset.php')) . 'index.asset.php');
        \wp_enqueue_style('wp-settings-builder-style-' . $this->menu_slug, \plugin_dir_url(\realpath(BUILDDIR . '/index.css')) . 'index.css', array(), $assets['version']);
        \wp_enqueue_script('wp-settings-builder-script' . $this->menu_slug, \plugin_dir_url(\realpath(BUILDDIR . '/index.js')) . 'index.js', $assets['dependencies'], $assets['version'], \true);
    }
    /**
     * Hook callback to create the options page from defined settings.
     */
    public function initPage()
    {
        \add_options_page($this->page_title, $this->menu_title, $this->capability, $this->menu_slug, array($this, 'renderPage'), $this->position);
    }
    public function renderPage()
    {
        if (!\is_admin() || !\current_user_can($this->capability)) {
            return;
        }
        if (isset($_GET['settings-updates']) && \check_admin_referer()) {
            \add_settings_error('WSB/' . $this->menu_slug, 'WSB/' . $this->menu_slug . '/message', 'Settings saved.', 'updated');
        }
        global $_wp_admin_css_colors;
        $theme = array('colors' => array('#000000', '#013c60', '#3399cc'), 'icon_colors' => array('base' => '#f3f1f1', 'focus' => '#fff', 'current' => '#fff'));
        if (isset($_wp_admin_css_colors[\get_user_option('admin_color')])) {
            $admin_color = $_wp_admin_css_colors[\get_user_option('admin_color')];
            $theme['colors'] = $admin_color->colors;
            $theme['icon_colors'] = $admin_color->icon_colors;
        }
        \settings_errors('WSB/' . $this->menu_slug . '/message');
        $styleVars = array('--wpsb-admin_colors-base' => $theme['colors'][0], '--wpsb-admin_colors-active' => $theme['colors'][\count($theme['colors']) - 2], '--wpsb-admin_colors-highlight' => $theme['colors'][\count($theme['colors']) - 1]);
        foreach ($theme['icon_colors'] as $ik => $ic) {
            $styleVars["--wpsb-admin_icon_colors-{$ik}"] = $ic;
        }
        $style = \implode('; ', \array_map(function ($key, $val) {
            return \esc_attr($key) . ':' . \esc_attr($val);
        }, \array_keys($styleVars), $styleVars));
        ?>
		<div
			class="wrap wp-settings-builder"
			style="<?php 
        echo $style;
        ?>">
			<h1><?php 
        echo \esc_html(\get_admin_page_title());
        ?></h1>
			<form action="options.php" method="post">
				<?php 
        \settings_fields($this->menu_slug);
        ?>
				<?php 
        $this->do_settings_sections($this->menu_slug);
        ?>
				<?php 
        \submit_button('Save Settings');
        ?>
			</form>
		</div>
		<?php 
    }
    public function addSection($id = \false, $title = 'Section', $callback = null)
    {
        if ($id === \false || $id === null) {
            $id = "WSB/{$this->menu_slug}/{$id}";
        }
        if (\array_key_exists($id, $this->sections)) {
            return $this->sections[$id];
        }
        $section = new Section($id, $title, $callback, $this->menu_slug);
        $this->sections[$id] = $section;
        return $section;
    }
    /**
     * Our own version of do_settings_sections.
     *
     * @param string $page settings page to output
     */
    public function do_settings_sections($page)
    {
        global $wp_settings_sections, $wp_settings_fields;
        if (!isset($wp_settings_sections[$page])) {
            return;
        }
        $use_tabs = \false;
        if (\count((array) $wp_settings_sections[$page]) > 1) {
            $use_tabs = \true;
        }
        $classes = array('wp-settings-builder');
        if ($use_tabs) {
            $classes[] = 'use-tabs';
        }
        \printf('<div class="%s">', \esc_attr(\implode(' ', $classes)));
        foreach ((array) $wp_settings_sections[$page] as $key => $section) {
            if ($use_tabs) {
                echo '
					<input
						class="wp-settings-tab"
						name="wp-settings-tab"
						type="radio"
						id="' . \esc_attr($section['id']) . '"
						' . (\array_key_first($wp_settings_sections[$page]) === $key ? 'checked="checked"' : '') . '
					>
					<label class="wp-settings-tablabel" for="' . \esc_attr($section['id']) . '">
						' . $section['title'] . '
					</label>
					<div class="wp-settings-panel">
				';
            } else {
                echo '<div class="wp-settings-content">';
            }
            if ($section['title']) {
                \printf('<h2 class="wp-settings-section_title">%s</h2>', \wp_kses_post($section['title']));
            }
            if ($section['callback']) {
                \call_user_func($section['callback'], $section);
            }
            if (!isset($wp_settings_fields) || !isset($wp_settings_fields[$page])) {
                continue;
            }
            $this->do_settings_fields($page, $section['id']);
            echo '</div>';
        }
        echo '</div>';
    }
    public function do_settings_fields($page, $section)
    {
        global $wp_settings_fields;
        if (!isset($wp_settings_fields[$page][$section])) {
            return;
        }
        foreach ((array) $wp_settings_fields[$page][$section] as $field) {
            $classes = array('wp-settings-field');
            if (!empty($field['args']['class'])) {
                $classes[] = $field['args']['class'];
            }
            if (\in_array('required', $field['args'], \true)) {
                $classes[] = 'required';
            }
            if (isset($field['args']['orientation']) && $field['args']['orientation'] !== 'row') {
                $classes[] = "orientation-{$field['args']['orientation']}";
            }
            $classes[] = "wpsb-type-{$field['args']['field_type']}";
            if (isset($field['args']['no-margin']) && $field['args']['no-margin']) {
                $classes[] = 'wpsb-no-margin';
            }
            \printf('<div class="%s">', \esc_attr(\implode(' ', $classes)));
            if (isset($field['title']) && $field['title']) {
                if (!empty($field['args']['label_for'])) {
                    \printf('<label for="%s" %s class="title">%s</label>', \esc_attr($field['args']['label_for']), \in_array('required', $field['args'], \true) ? ' title="This field is required"' : '', \is_bool($field['title']) ? '' : \wp_kses_post($field['title']));
                } else {
                    \printf('<span class="title" %s>%s</span>', \in_array('required', $field['args'], \true) ? ' title="This field is required"' : '', \is_bool($field['title']) ? '' : \wp_kses_post($field['title']));
                }
            }
            echo '<div class="wp-settings-field-content">';
            \call_user_func($field['callback'], $field['args']);
            echo '</div>';
            echo '</div>';
        }
    }
}
