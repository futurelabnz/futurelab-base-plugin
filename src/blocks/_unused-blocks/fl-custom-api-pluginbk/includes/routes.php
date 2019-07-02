<?php


namespace FutureLab;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

class routes {

	public function __construct() {

	}


	public function register_routes() {


	}

	public function register_fields() {

		register_rest_field( 'fl_team_member',
			'teamMemberImage',
			array(
				'get_callback' => array( $this, 'get_team_member_image' ),
				10,
				4,
				'schema'       => null,
			)
		);
	}

	public function get_team_member_image( $post, $attr, $request, $object ) {

		$data['image_id']   = get_post_thumbnail_id( $post['id'] );
		$data['img_src']    = wp_get_attachment_image_url( $data['image_id'], 'large' );
		$data['img_srcset'] = wp_get_attachment_image_srcset( $data['image_id'], 'full' );
		$data['img_alt']    = get_post_meta( $data['image_id'], '_wp_attachment_image_alt', true );

		$data['meta_data'] = wp_get_attachment_metadata( $data['image_id'] );

		return $data;

	}


}