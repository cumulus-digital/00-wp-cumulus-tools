<?php

namespace CUMULUS\Gutenberg\Tools;

use CUMULUS\Gutenberg\Tools\Vendors\vena\WordpressSettingsBuilder\Builder as SettingsBuilder;

// General settings for all Cumulus Tools.
\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

\define(
	'CUMULUS\Gutenberg\Tools\BASE_OPTION_KEY',
	'wp-cumulus-tools'
);

class Settings {
	/** @var \vena\WordpressSettingsBuilder\Builder */
	public static $instance;

	public static $basics = array(
		'tools' => array(
			'collapse-hierarchical' => array(
				'title'   => 'Collapse Hierarchical Types',
				'default' => '1',
			),
			'remote-ads-txt' => array(
				'title'   => 'Remote ads.txt Mirror',
				'default' => '1',
			),
		),
		'blocks' => array(
			'anchor' => array(
				'title'   => 'Anchor',
				'default' => '1',
			),
			'big-feature' => array(
				'title'   => 'Big Feature',
				'default' => '1',
			),
			'collapsable-group' => array(
				'title'   => 'Collapsable Group',
				'default' => '1',
			),
			'donut-graph' => array(
				'title'   => 'Donut Graph',
				'default' => '1',
			),
			'family-links' => array(
				'title'   => 'Family Links',
				'default' => '1',
			),
			'imageflip' => array(
				'title'   => 'Flip Card',
				'default' => '0',
			),
			'category-slideshow' => array(
				'title'   => 'Image Category Slideshow',
				'default' => '0',
			),
			'station-finder' => array(
				'title'   => 'Station Finder',
				'default' => '0',
			),
		),
	);

	private static $overrideClearOnDeactivation = false;

	public static function builder() {
		if ( ! self::$instance ) {
			$defaults = array(
				'clear_on_deactivation' => '0',
			);
			foreach ( Settings::$basics['tools'] as $tool => $opt ) {
				$defaults['tools'][$tool] = $opt['default'];
			}
			foreach ( Settings::$basics['blocks'] as $block => $opt ) {
				$defaults['blocks'][$block] = $opt['default'];
			}

			$defaults = \apply_filters( 'wp-cumulus-tools--general-defaults', $defaults );

			\register_setting(
				'wp-cumulus-tools',
				BASE_OPTION_KEY,
				array(
					'default' => $defaults,
				)
			);

			self::$instance = new SettingsBuilder(
				'Cumulus Tools Settings',
				'Cumulus Tools',
				'install_plugins',
				'wp-cumulus-tools',
				\PHP_INT_MAX
			);
		}

		return self::$instance;
	}

	public static function isActivated( $type, $id ) {
		$main_options = \get_option( BASE_OPTION_KEY );

		if (
			! \is_array( $main_options )
			|| ! isset( $main_options['activated'] )
			|| ! isset( $main_options['activated'][ $type ] )
			|| ! isset( $main_options['activated'][ $type ][$id] )
		) {
			return self::$basics[ $type ][$id]['default'] === '1';
		}

		return $main_options['activated'][ $type ][$id] === '1';
	}

	public static function isBlockActivated( $id ) {
		return self::isActivated( 'blocks', $id );
	}

	public static function isToolActivated( $id ) {
		return self::isActivated( 'tools', $id );
	}

	public static function clearOnDeactivation() {
		if ( self::$overrideClearOnDeactivation ) {
			return true;
		}

		$main_options = \get_option( BASE_OPTION_KEY );

		if (
			\is_array( $main_options )
			&& isset( $main_options['clear_on_deactivation'] )
			&& $main_options['clear_on_deactivation'] === '1'
		) {
			return true;
		}

		return false;
	}

	public static function overrideClearOnDeactivation() {
		self::$overrideClearOnDeactivation = true;
	}
}

// Handle deactivation
\add_filter( 'wp-cumulus-tools--on-deactivation', function ( $callbacks ) {
	if ( Settings::clearOnDeactivation() ) {
		$callbacks[] = function () {
			\delete_option( BASE_OPTION_KEY );
		};
	}

	return $callbacks;
} );

$settings = Settings::builder();

$general = $settings->addSection(
	'CumulusTools/General',
	'Activation'
);

$general->addField( array(
	'type' => 'html',
	'args' => array(
		'content' => '<h3 style="font-weight: normal; font-size: 1rem">Tools</h3>',
	),
) );

foreach ( Settings::$basics['tools'] as $tool => $opts ) {
	$general->addField( array(
		'type'        => 'checkbox',
		'id'          => 'cumulus-tools/general/activated/tools/' . $tool,
		'title'       => $opts['title'],
		'option_name' => BASE_OPTION_KEY . '[activated][tools][' . $tool . ']',
		'default'     => $opts['default'],
		'args'        => array( 'no-margin' => true ),
	) );
}

$general->addField( array(
	'type' => 'html',
	'args' => array(
		'content' => '<hr style="width: 100%; margin: .75em auto;">',
	),
) );

$general->addField( array(
	'type' => 'html',
	'args' => array(
		'content' => '<h3 style="font-weight: normal; font-size: 1rem">Blocks</h3>',
	),
) );

foreach ( Settings::$basics['blocks'] as $block => $opts ) {
	$general->addField( array(
		'type'        => 'checkbox',
		'id'          => 'cumulus-tools/general/activated/blocks/' . $block,
		'title'       => $opts['title'],
		'option_name' => BASE_OPTION_KEY . '[activated][blocks][' . $block . ']',
		'default'     => $opts['default'],
		'args'        => array( 'no-margin' => true ),
	) );
}

$general->addField( array(
	'type' => 'html',
	'args' => array(
		'content' => '<hr style="width: 100%; margin: 1.5em auto;">',
	),
) );

$general->addField( array(
	'type'        => 'checkbox',
	'id'          => 'cumulus-tools/general/clear-on-deactivation',
	'title'       => true,
	'option_name' => BASE_OPTION_KEY . '[clear_on_deactivation]',
	'default'     => '0',
	'args'        => array(
		'title' => 'Delete all plugin settings upon deactivation.',
	),
	'orientation' => 'column',
) );
