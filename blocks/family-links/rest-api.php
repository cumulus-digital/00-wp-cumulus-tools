<?php

namespace CUMULUS\Gutenberg\Tools\Blocks\FamilyLinks;

\defined( 'ABSPATH' ) || exit( 'No direct access allowed.' );

function list_children( \WP_REST_Request $request ) {
	$defaults = array(
		'type'        => 'page',
		'child_of'    => 0,
		'_fields'     => 'id,parent,title',
		'sort_column' => 'menu_order,title',
		'sort_order'  => 'asc',
	);
	$options = \array_merge( $defaults, $request->get_params() );

	$children = \get_pages( $options );

	if ( empty( $children ) ) {
		return new \WP_REST_Response( array(), 200 );
	}

	$response = new \WP_REST_Posts_Controller( $options['type'] );
	$return   = array();

	foreach ( $children as &$child ) {
		$return[] = $response->prepare_item_for_response( $child, $request )->data;
	}

	return new \WP_REST_Response( $return, 200 );
}
\add_action( 'rest_api_init', function () {
	$namespace = 'cumulus-gutenberg-family-links/v1';
	\register_rest_route( $namespace, '/children-of/(?P<child_of>\d+)', array(
		'methods'             => 'GET',
		'callback'            => __NAMESPACE__ . '\\list_children',
		'permission_callback' => function () {
			return \current_user_can( 'read' );
		},
	) );
} );
