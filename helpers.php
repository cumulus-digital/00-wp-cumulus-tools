<?php

namespace CUMULUS\Gutenberg\Tools;

use WP_Block_Type_Registry;

/*
 * Helper functions for Cumulus WP Tools
 */

/**
 * Determine if a block has been registered
 *
 * @param string $name Block name
 *
 * @return bool
 */
function is_block_registered( $name ) {
	$registry = WP_Block_Type_Registry::get_instance();

	return $registry->get_registered( $name );
}

/*
 * Replacement for WP's has_block which works with reusable blocks.
 * If given multiple block names, will return true if ANY named blocks
 * are found.
 *
 * @param string|array $block_name Block name (string) or names (array or string separated by commas or spaces)
 * @param int|string|WP_Post|null $id Post ID (optional, will use current post)
 *
 * @return bool
 */
function contains_block( $block_names = false, $post_id = null ) {
	if ( $block_names === false ) {
		return false;
	}

	if ( $post_id === false ) {
		$post_id = \get_the_ID();
	}

	if ( $post_id !== false ) {
		// Handle posts without blocks
		if ( ! \has_blocks( $post_id ) ) {
			return false;
		}

		// Generate block names array if necessary
		if (
			! \is_array( $block_names ) && (
				\mb_strpos( $block_names, ',' ) || \mb_strpos( $block_names, ' ' )
			)
		) {
			$block_names = \preg_split( '/[,\s]/', $block_names, -1, \PREG_SPLIT_NO_EMPTY );
		}

		// Assume shorthand block names are core blocks
		$block_names = \array_map( function ( $name ) {
			if ( ! \mb_strpos( $name, '/' ) ) {
				$name = 'core/' . $name;
			}
		}, $block_names );

		// Handle regular blocks quickly
		foreach ( $block_names as $block_name ) {
			if ( \has_block( $block_name, $post_id ) ) {
				return true;
			}
		}

		// Handle reusable blocks
		if ( \has_block( 'core/block', $post_id ) ) {
			// Check post content for reusable blocks
			$content = \get_post_field( 'post_content', $post_id );
			$blocks  = \parse_blocks( $content );

			if ( ! \is_array( $blocks ) || empty( $blocks ) ) {
				return false;
			}

			// Recursive search for our block
			function search_reusable_blocks( $blocks, $block_name ) {
				foreach ( $blocks as $block ) {
					if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) ) {
						return search_reusable_blocks( $block['innerBlocks'], $block_name );
					} elseif ( $block['blockName'] === 'core/block' && ! empty( $block['attrs']['ref'] ) && \has_block( $block_name, $block['attrs']['ref'] ) ) {
						return true;
					}
				}

				return false;
			}

			return \array_walk( $block_names, function ( $block_name ) use ( $blocks ) {
				return search_reusable_blocks( $blocks, $block_name );
			} );
		}
	}

	return false;
}
