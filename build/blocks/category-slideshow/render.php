<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\CategorySlideshow;

$is_backend = \defined( 'REST_REQUEST' ) && true === REST_REQUEST && 'edit' === $_GET['context'];

function render( $attributes ) {
	$category = \array_key_exists( 'category', $attributes ) ? $attributes['category'] : 1;
	if ( ! \filter_var( $category, \FILTER_VALIDATE_INT ) || $category == 1 ) {
		echo 'Invalid category.';

		return;
	}

	$args = array(
		'category'       => $category,
		'post_type'      => 'attachment',
		'post_mime_type' => 'image/*',
		'post_status'    => array( 'inherit', 'publish' ),
		'numberposts'    => 20,
		'posts_per_page' => 20,
	);
	$media = \get_posts( $args );

	if ( \count( $media ) === 0 ) {
		echo 'No images found in this category.';

		return;
	}

	foreach( $media as $image ) {
		?>
		<img src="<?php echo \esc_url( \wp_get_attachment_url( $image->ID ) ); ?>" alt="<?php echo \esc_attr( $image->post_title ); ?>" />
		<?php
	}
}
?>

<?php if ( ! $is_backend ): ?>
<div <?php echo \get_block_wrapper_attributes(); ?> data-timeout="<?php echo \esc_attr( $attributes['timeout'] ); ?>">
	<div>
<?php endif; ?>

	<?php render( $attributes ); ?>

<?php if ( ! $is_backend ): ?>
	</div>
</div>
<?php endif; ?>