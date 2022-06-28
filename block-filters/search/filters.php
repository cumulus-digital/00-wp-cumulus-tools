<?php

namespace CUMULUS\Gutenberg\Tools\BlockFilters;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

/*
 * Adds defined filters to core/search block output
 */
\add_filter( 'render_block', function ( $content, $block ) {
	if ( $block['blockName'] !== 'core/search' ) {
		return $content;
	}

	$attrs = \array_filter( $block['attrs'] );

	if ( ! \array_key_exists( 'query', $attrs ) && ! \array_key_exists( 'baseCategory', $attrs ) ) {
		return $content;
	}

	if ( isset( $attrs['baseCategory'] ) ) {

		// use the category's url as the form action
		$category = \get_category_by_slug( $attrs['baseCategory'] );

		if ( $category ) {
			$cat_link   = \esc_attr( \get_category_link( $category ) );
			$newContent = \preg_replace( '/action="[^"]+"/i', "action='{$cat_link}'", $content, 1 );

			if ( $newContent ) {
				return $newContent;
			}
		}

		return $content;
	}

	if ( isset( $attrs['query'] ) && isset( $attrs['query']['postType'] ) ) {
		// Complex query
		$query             = $attrs['query'];
		$formClosePosition = \mb_strpos( $content, '</form>' );
		$newContent        = '<input type="hidden" name="t" value="' . \esc_attr( $query['postType'] ) . '" />';

		if ( \array_key_exists( 'taxQuery', $query ) ) {
			foreach ( $query['taxQuery'] as $tax => $ids ) {
				foreach ( $ids as $id ) {
					$newContent .= '<input type="hidden" name="' . \esc_attr( $tax ) . '[]" value="' . \esc_attr( $id ) . '" />';
				}
			}
		}

		$content = \substr_replace( $content, $newContent, $formClosePosition, 0 );
	}

	return $content;
}, 10, 2 );
