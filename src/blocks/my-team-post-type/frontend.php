<?php
function my_team_post_type_render_callback( $attributes, $content ) {
	$args = array(
		'numberposts' => - 1, // pull all team members
		'post_type'   => 'fl_team_member',
		'post_status' => 'publish',
	);

	if ( isset( $attributes['postType'] ) ) {
		$args['post_type'] = $attributes['postType'];
	}

	if ( isset( $attributes['selectedTaxonomy'] ) ) {
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'fl_teams',
				'field'    => 'term_id',
				'terms'    => array( $attributes['selectedTaxonomy'] )
			),
		);
	}
	
	$recent_posts = get_posts( $args );

	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_id          = $post->ID;
		$image_url        = wp_get_attachment_image_url( get_post_thumbnail_id( $post->ID ), 'large' );
		$image_srcset_url = wp_get_attachment_image_srcset( get_post_thumbnail_id( $post->ID ), 'full' );
		$image_alt        = get_post_meta( get_post_thumbnail_id( $post->ID ), '_wp_attachment_image_alt', true );
		$title            = get_the_title( $post_id );
		$team_position    = get_post_meta( $post->ID, 'fl_team_position', true );
		$post_content     = get_post_field( 'post_excerpt', $post->ID );
		$post_link        = get_permalink( $post->ID );

		$list_items_markup .= sprintf(
			'<div class="cell">
                <div class="my-team-post-type-cell-content">
                <a href="%1$s"><img src="%2$s" srcSet="%3$s" alt="%4$s" /></a>',
			$post_link,
			$image_url,
			$image_srcset_url,
			$image_alt
		);

		$list_items_markup .= sprintf(
			'<a href="%1$s"><h3 class="team-title">%2$s</h3></a>
			<a href="%1$s"><h3 class="team-position">%3$s</h3></a>
            <div class="team-content">%4$s</div>',
			$post_link,
			$title,
			$team_position,
			$post_content
		);

		$list_items_markup .= sprintf( '</div>' );

		$list_items_markup .= sprintf( '</div>' );
	}

	$class = 'wp-block-futurelab-block-my-team-post-type';

	$block_content = sprintf(
		'<div class="%1$s">
			<div class="grid-x grid-padding-x small-up-1 medium-up-2 large-up-3 alignwide">
				%2$s
			</div>
		</div>',
		esc_attr( $class ),
		$list_items_markup
	);

	return $block_content;
}

function my_team_post_type_dynamic() {
	register_block_type( 'futurelab/block-my-team-post-type', array(
		'render_callback' => 'my_team_post_type_render_callback',
		'attributes'      => array(
			'postType'  => array(
				'type' => 'string',
			),
			'className' => array(
				'type' => 'string',
			),
		)
	) );
}

add_action( 'init', 'my_team_post_type_dynamic' );
