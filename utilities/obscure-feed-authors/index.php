<?php

namespace CUMULUS\Gutenberg\Tools\Utilities\ObscureFeedAuthors;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

class ObscureFeedAuthors {
	public static function init() {
		\add_action( 'the_author', array( __NAMESPACE__ . '\\ObscureFeedAuthors', 'the_author' ), \PHP_INT_MAX, 1 );
		\add_action( 'init', array( __NAMESPACE__ . '\\ObscureFeedAuthors', 'build_settings' ), 1 );
	}

	public static function build_settings() {
		$settings        = \CUMULUS\Gutenberg\Tools\Settings::builder();
		$author_settings = $settings->addSection(
			'CumulusTools/ObscureFeedAuthors',
			'Feed Authors',
			function () {
				?>
				<p>
					When replacing author names in feed items, the following checked users will
					be <strong>excluded</strong> and NOT be replaced:
				</p>
				<?php
			}
		);

		$options      = \get_option( \CUMULUS\Gutenberg\Tools\BASE_OPTION_KEY );
		$excluded_ids = array();
		if ( \is_array( $options ) && isset( $options['obscure-feed-authors'], $options['obscure-feed-authors']['exclude_authors'] ) ) {
			$excluded_ids = $options['obscure-feed-authors']['exclude_authors'];
		}
		$users      = \get_users();
		$publishers = array();
		foreach ( $users as $user ) {
			if ( $user->has_cap( 'publish_posts' ) ) {
				$publishers[] = array(
					'title' => $user->display_name,
					'value' => $user->ID,
				);
				/*
				$author_settings->addField( array(
					'type'        => 'checkbox',
					'id'          => 'cumulus-tools/obscure-feed-authors/' . $user->ID,
					'title'       => false,
					'option_name' => \CUMULUS\Gutenberg\Tools\BASE_OPTION_KEY . '[obscure-feed-authors][exclude_authors][]',
					'default'     => false,
					'args'        => array(
						'no-margin' => true,
						'title'     => $user->display_name,
						'value'     => $user->ID,
					),
					'option_args' => array(
						'value' => $user->ID,
					),
					'orientation' => 'column',
				) );
				 */
			}
		}
		$author_settings->addField( array(
			'type'        => 'checkbox',
			'id'          => 'cumulus-tools/obscure-feed-authors/exclude-authors',
			'title'       => false,
			'option_name' => \CUMULUS\Gutenberg\Tools\BASE_OPTION_KEY . '[obscure-feed-authors][exclude_authors][]',
			'default'     => false,
			'args'        => array(
				'no-margin' => true,
				'label_for' => 'cumulus-tools/obscure-feed-authors/exclude-authors',
				'value'     => false,
				'options'   => $publishers,
			),
			'orientation' => 'column',
		) );
	}

	public static function the_author( $display_name ) {
		if ( \is_feed() ) {
			$author_id = \get_the_author_meta( 'ID' );
			$options   = \get_option( \CUMULUS\Gutenberg\Tools\BASE_OPTION_KEY );

			if (
				\is_array( $options )
				&& isset(
					$options['obscure-feed-authors'],
					$options['obscure-feed-authors']['exclude_authors']
				)
				&& \in_array( $author_id, $options['obscure-feed-authors']['exclude_authors'], false )
			) {
				return $display_name;
			}

			return \get_bloginfo( 'name' );
		}

		return $display_name;
	}
}

if ( \CUMULUS\Gutenberg\Tools\Settings::isToolActivated( 'obscure-feed-authors' ) ) {
	ObscureFeedAuthors::init();
}
