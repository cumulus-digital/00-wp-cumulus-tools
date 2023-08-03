<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\FamilyLinks;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

require __DIR__ . '/FamilyLinkWalker.php';

function attr( $attr, $key, $default = null ) {
	if ( isset( $attr[ $key ] ) ) {
		return $attr[ $key ];
	}

	return $default;
}

function renderCallback( $attr, $content, $block ) {
	$is_backend   = \defined( 'REST_REQUEST' ) && true === REST_REQUEST && 'edit' === \filter_input( \INPUT_GET, 'context', \FILTER_SANITIZE_STRING );
	$maxDepth     = attr( $attr, 'maxDepth', null );
	$parentPostId = 0;

	if ( isset( $_GET['post_id'] ) ) {
		$postId = $_GET['post_id'];
	} else {
		$postId = \get_the_ID();
	}

	if ( \array_key_exists( 'parentPostId', $attr ) ) {
		if ( $attr['parentPostId'] > 0 ) {
			$parent = \get_post( $attr['parentPostId'] );

			if ( ! $parent ) {
				return $attr['parentPostId'] . ' No such post exists.';
			}
			$parentPostId = $parent->ID;
			$postType     = \get_post_type( $parent );
		} else {
			$parentPostId = 0;
			$postType     = \get_post_type( $postId );
		}
	} else {
		// Default parent is the current page
		$parentPostId = $postId;
		$postType     = \get_post_type( $postId );
	}

	$exclude = array();

	if ( ! $attr['showCurrentChildren'] ) {
		$children = new \WP_Query( array(
			'post_parent'    => $postId,
			'post_type'      => $postType,
			'fields'         => 'ids',
			'posts_per_page' => -1,
		) );
		$exclude = \array_merge( $exclude, $children->posts );
	}

	$defaults = array(
		'post_type'   => $postType,
		'depth'       => $maxDepth,
		'sort_column' => 'menu_order,post_title',
		'title_li'    => '',
		'echo'        => false,
		'walker'      => new FamilyLinkWalker(),
		'exclude'     => array(),
	);
	$args = \array_merge( $defaults, array(
		'child_of' => $parentPostId,
		'exclude'  => $exclude,
	) );

	if ( $attr['excludeNoindex'] ) {

		// Get list of page IDs where noindex is set in aioseo
		if ( \function_exists( 'aioseo' ) ) {
			$aioseo_query = \aioseo()->core->db
				->start( \aioseo()->core->db->db->posts . ' as p', true )
				->select( 'p.ID' )
				->leftJoin( 'aioseo_posts as ap', '`ap`.`post_id` = `p`.`ID`' )
				->where( 'p.post_status', 'publish' )
				->whereRaw( '`ap`.`robots_noindex` = 1' );

			$aioseo_exclude_ids = $aioseo_query->run( true, 'col' )
				->result();

			if ( $aioseo_exclude_ids && \count( $aioseo_exclude_ids ) ) {
				// $args['exclude'] .= \implode( ',', $aioseo_exclude_ids );
				$args['exclude'] = \array_merge( $args['exclude'], $aioseo_exclude_ids );
			}
		}

		if ( ! \array_key_exists( 'meta_query', $args ) ) {
			$args['meta_query'] = array();
		}
		$args['meta_query'] = \array_merge( $args['meta_query'], array(
			array(
				'key'     => '_yoast_wpseo_meta-robots-noindex',
				'value'   => 1,
				'compare' => 'NOT EXISTS',
			),
			array(
				'key'     => '_hide_from_sitemap',
				'compare' => 'NOT EXISTS',
			),
		) );
	}

	if ( \array_key_exists( 'excludeAdditionalIDs', $attr ) ) {
		if ( ! \is_array( $attr['excludeAdditionalIDs'] ) ) {
			$excludeAdditionalIDs = \explode( ',', $attr['excludeAdditionalIDs'] );
		} else {
			$excludeAdditionalIDs = $attr['excludeAdditionalIDs'];
		}

		if ( \count( $excludeAdditionalIDs ) ) {
			// $args['exclude'] .= \implode( ',', $excludeAdditionalIDs );
			$args['exclude'] = \array_merge( $args['exclude'], $excludeAdditionalIDs );
		}
	}

	$args['exclude'] = \implode( ',', $args['exclude'] );

	$pages = \wp_list_pages( $args );

	if ( \mb_strlen( $pages ) < 1 ) {
		return 'None found.';
	}

	$classes = \array_filter( array(
		"is-style-{$attr['displayType']}",
		attr( $attr, 'textAlign' ) ? "has-text-align text-align-{$attr['textAlign']}" : null,
		attr( $attr, 'linkColor' ) ? 'has-link-color' : null,
		attr( $attr, 'linkColorHover' ) ? 'has-link-color-hover' : null,
		attr( $attr, 'underlineLinks', false ) ? 'has-underline-links' : 'has-no-underline-links',
		attr( $attr, 'underlineOnHover', false ) ? 'has-underline-links-hover' : 'has-no-underline-links-hover',
		attr( $attr, 'displayType' ) === 'custom' ? 'has-custom-bullet' : null,
	) );

	$marginDefault = array(
		'top'    => null,
		'right'  => null,
		'bottom' => null,
		'left'   => null,
	);
	$itemMargin     = attr( $attr, 'itemMargin', $marginDefault );
	$childrenMargin = attr( $attr, 'childrenMargin', $marginDefault );
	$styleAttr      = \array_filter( array(
		'custom-bullet' => '"' . attr(
			$attr,
			'customBullet'
		) . '"',
		'bullet-color' => attr(
			$attr,
			'bulletColor'
		),
		'item-margin-top' => attr(
			$itemMargin,
			'top'
		),
		'item-margin-right' => attr(
			$itemMargin,
			'right'
		),
		'item-margin-bottom' => attr(
			$itemMargin,
			'bottom'
		),
		'item-margin-left' => attr(
			$itemMargin,
			'left'
		),
		'children-margin-top' => attr(
			$childrenMargin,
			'top'
		),
		'children-margin-right' => attr(
			$childrenMargin,
			'right'
		),
		'children-margin-bottom' => attr(
			$childrenMargin,
			'bottom'
		),
		'children-margin-left' => attr(
			$childrenMargin,
			'left'
		),
		'text-align' => attr(
			$attr,
			'textAlign'
		),
		'link-color' => attr(
			$attr,
			'linkColor'
		),
		'link-color-hover' => attr(
			$attr,
			'linkColorHover'
		),
	) );

	// Only set current page styles if highlightCurrent is enabled
	if ( attr( $attr, 'highlightCurrent', false ) ) {
		$classes = \array_merge( $classes, \array_filter( array(
			attr( $attr, 'currentLinkColor' ) ? 'has-current-link-color' : null,
			attr( $attr, 'currentLinkColorHover' ) ? 'has-current-link-color-hover' : null,
			attr( $attr, 'currentUnderlineLinks', false ) ? 'has-current-underline-link' : 'has-current-no-underline-link',
			attr( $attr, 'currentUnderlineOnHover', false ) ? 'has-current-underline-link-hover' : 'has-current-no-underline-link-hover',
		) ) );
		$styleAttr = \array_merge( $styleAttr, \array_filter( array(
			'current-link-color' => attr(
				$attr,
				'currentLinkColor'
			),
			'current-link-color-hover' => attr(
				$attr,
				'currentLinkColorHover'
			),
			'current-font-weight' => attr(
				$attr,
				'currentFontWeight'
			),
			'current-font-style' => attr(
				$attr,
				'currentFontStyle'
			),
			'current-font-size' => attr(
				$attr,
				'currentFontSize'
			),
		) ) );
	}

	$params = array(
		'class' => \implode(
			' ',
			$classes
		),
		'style' => \array_reduce(
			\array_keys( $styleAttr ),
			function (
				$css,
				$key
			) use ( $styleAttr ) {
				return "--{$key}: {$styleAttr[ $key ]};" . $css;
			}
		),
	);
	\ob_start(); ?>
	<nav
		<?php
		// If in editor
		if ( $is_backend ) {
			foreach ( $params as $key => $val ) {
				echo \esc_html( $key ) . '="' . \esc_attr( $val ) . '" ';
			}
		} else {
			echo \get_block_wrapper_attributes( $params );
		} ?>
	>
		<ul>
			<?php echo $pages; ?>
		</ul>
	</nav>
	<?php

	return \ob_get_clean();
}
