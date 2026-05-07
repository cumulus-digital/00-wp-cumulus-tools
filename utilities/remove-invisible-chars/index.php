<?php

namespace CUMULUS\Gutenberg\Tools\Utilities\RemoveInvisibleCharacters;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

class RemoveInvisibleChars {
    static $patterns = [
        '/[\x{00a0}\x{202f}\x{200b}]/u',
        '/&nbsp;/',
    ];

    static public function removeChars($str) {
        foreach (self::$patterns as $pattern) {
            $str = preg_replace($pattern, ' ', $str);
        }
        return $str;
    }

    static public function process($data, $postarr) {
        // Only act on standard posts
        if ($data['post_type'] !== 'post') {
            \do_action( 'qm/debug', 'Was not a post' );
            return $data;
        }

        // Check if post contains any affected chars before going to the database
        $has_invisible_chars = FALSE;
        foreach (self::$patterns as $pattern) {
            if (preg_match($pattern, $data['post_content'])) {
                $has_invisible_chars = TRUE;
                break;
            }
        }
        if ( ! $has_invisible_chars) {
            \do_action( 'qm/debug', 'No invisible chars' );
            return $data;
        }

        // Resolve category IDs being assigned
        $category_ids = [];

        if ( ! empty($postarr['post_category'])) {
            $category_ids = array_map('intval', $postarr['post_category']);
        } elseif ( ! empty($postarr['ID'])) {
            // Existing post update fallback
            $category_ids = wp_get_post_categories($postarr['ID']);
        }

        if (empty($category_ids)) {
            \do_action( 'qm/debug', 'No category IDs for post' );
            return $data;
        }

        $term = get_term_by('name', 'Press Releases', 'category');
        if ( ! $term) {
            $term = get_term_by('name', 'Press Release', 'category');
            if ( ! $term) {
                \do_action( 'qm/debug', 'Press Release category not found' );
                return $data; // category doesn't exist
            }
        }
        $press_release_cat_id = (int) $term->term_id;

        $matches = FALSE;
        foreach ($category_ids as $cat_id) {
            if (
                $cat_id === $press_release_cat_id ||
                cat_is_ancestor_of($press_release_cat_id, $cat_id)
            ) {
                $matches = TRUE;
                break;
            }
        }

        if ( ! $matches) {
            \do_action( 'qm/debug', 'Post is not in Press Release category' );
            return $data;
        }

        $affected_keys = ['post_title', 'post_content', 'post_excerpt'];
        foreach ($affected_keys as $key) {
            if (isset($data[$key])) {
                $data[$key] = self::removeChars($data[$key]);
            }
        }
        return $data;
    }
}

if ( \CUMULUS\Gutenberg\Tools\Settings::isToolActivated( 'remove-invisible-chars' ) ) {
	\add_filter('wp_insert_post_data', __NAMESPACE__ . '\\RemoveInvisibleChars::process', 10, 2);
}
