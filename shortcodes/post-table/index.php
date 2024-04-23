<?php

namespace CUMULUS\Gutenberg\Tools\Shortcodes\PostTable;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

const PREFIX = 'wp-tools-post-table-shortcode';

function post_table_shortcode( $attr ) {
	$attr = \shortcode_atts( array(
		'category'    => null,
		'tag'         => null,
		'order'       => 'desc',
		'orderby'     => 'date',
		'before'      => null,
		'after'       => '1 year ago',
		'max'         => -1,
		'date_format' => 'n/j/y',
		'add_class'   => null,
	), $attr, 'post_table' );

	$posts = (new \WP_Query( array(
		'category_name' => $attr['category'],
		'tag'           => $attr['tag'],
		'date_query'    => array(
			array(
				'after'  => $attr['after'],
				'before' => $attr['before'],
			),
		),
		'orderby'        => $attr['orderby'],
		'order'          => $attr['order'],
		'posts_per_page' => $attr['max'],
	) ));

	\ob_start();
	?>
    <figure class="wp-block-table is-style-stripes wp-tools-post-table-shortcode <?php echo \esc_attr( $attr['add_class'] ); ?>">
        <table>
            <thead style="display: none">
                <tr>
                    <th>Date</th>
                    <th>Article Title</th>
                </tr>
            </thead>
            <tbody>
                <?php while ( $posts->have_posts() ): $posts->the_post(); ?>
                <tr>
                    <td class="has-text-align-right post-table-date" data-align="right">
                        <?php echo \get_the_date( $attr['date_format'] ); ?>
                    </td>
                    <td class="post-table-title">
                        <?php \the_title( \sprintf( '<a href="%s">', \esc_url( \get_permalink() ) ), '</a>' ); ?>
                    </td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </figure>
	<?php
	$output = \ob_get_clean();
	\wp_reset_postdata();
	\wp_enqueue_style( PREFIX . '_style' );

	return $output;
}
\add_shortcode( 'posts-table', __NAMESPACE__ . '\\post_table_shortcode' );

/**
 * Include styles.
 */
function register_styles() {
	\wp_register_style(
		PREFIX . '_style',
		\plugins_url( 'styles.css', __FILE__ ),
		array(),
		null,
		'all'
	);
}
\add_action( 'init', __NAMESPACE__ . '\\register_styles' );
