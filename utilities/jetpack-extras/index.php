<?php

namespace CUMULUS\Gutenberg\Tools\Utilities\JetpackExtras;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

class JetpackExtras {
	public static $defaults = array(
		'show-modules-menu' => array(
			'title'   => 'Show "Modules" menu.',
			'default' => '0',
		),
		'disable-image-sitemap' => array(
			'title'   => 'Disable Images sitemap.',
			'default' => '0',
		),
		'disable-video-sitemap' => array(
			'title'   => 'Disable Video sitemap.',
			'default' => '0',
		),
	);

	public static function init() {
		$settings         = \CUMULUS\Gutenberg\Tools\Settings::builder();
		$jetpack_settings = $settings->addSection(
			'CumulusTools/JetpackExtras',
			'Jetpack Options'
		);

		foreach ( self::$defaults as $key => $opt ) {
			$jetpack_settings->addField( array(
				'type'        => 'checkbox',
				'id'          => 'cumulus-tools/jetpack-extras/' . $key,
				'title'       => true,
				'option_name' => \CUMULUS\Gutenberg\Tools\BASE_OPTION_KEY . '[jetpack-extras][' . $key . ']',
				'default'     => $opt['default'],
				'args'        => array(
					'title' => $opt['title'],
				),
				'orientation' => 'column',
			) );
		}

		\add_action( 'init', array( __NAMESPACE__ . '\\JetpackExtras', 'execute' ) );
	}

	public static function getOption( $id ) {
		$options = \get_option( \CUMULUS\Gutenberg\Tools\BASE_OPTION_KEY );

		if (
			! \is_array( self::$defaults[ $id ] )
			|| ! isset( self::$defaults[ $id ]['default'] )
		) {
			return;
		}

		if (
			! \is_array( $options )
			|| ! isset( $options['jetpack-extras'] )
			|| ! isset( $options['jetpack-extras'][$id] )
		) {
			return self::$defaults[ $id ]['default'];
		}

		return $options['jetpack-extras'][$id];
	}

	public static function isOptionEnabled( $id ) {
		return self::getOption( $id ) === '1';
	}

	public static function execute() {
		if ( self::isOptionEnabled( 'disable-image-sitemap' ) ) {
			\add_filter( 'jetpack_sitemap_image_skip_post', '__return_true' );
		}

		if ( self::isOptionEnabled( 'disable-video-sitemap' ) ) {
			\add_filter( 'jetpack_sitemap_video_skip_post', '__return_true' );
		}

		if ( self::isOptionEnabled( 'show-modules-menu' ) ) {
			\add_action( 'jetpack_admin_menu', function () {
				\add_submenu_page(
					'jetpack',
					'Jetpack Modules',
					'Modules',
					'manage_options',
					'jetpack_modules',
					'jetpack'
				);
			} );
		}
	}
}

if ( \CUMULUS\Gutenberg\Tools\Settings::isToolActivated( 'jetpack-extras' ) ) {
	JetpackExtras::init();
}
