<?php
function custom_post_type_render_callback($attributes, $content)
{
    $args = array(
        // 'numberposts' => 3,
        // 'post_type' => 'fl_team_member',
        'post_status' => 'publish',
    );

    // print_r('<pre>');
    // print_r($attributes);
    // print_r('</pre>');

    if (isset($attributes['postType'])) {
        $args['post_type'] = $attributes['postType'];
    }

    // print_r('<pre>');
    // print_r($args);
    // print_r('</pre>');

    $recent_posts = get_posts($args);

    $list_items_markup = '';

    foreach ($recent_posts as $post) {
        $post_id          = $post->ID;
        $image_url          = wp_get_attachment_image_url(get_post_thumbnail_id($post->ID), 'large');
        $image_srcset_url = wp_get_attachment_image_srcset(get_post_thumbnail_id($post->ID), 'full');
        $image_alt          = get_post_meta(get_post_thumbnail_id($post->ID), '_wp_attachment_image_alt', true);
        $title            = get_the_title($post_id);
        $team_position      =    get_post_meta($post->ID, 'fl_team_position', true);
        $post_content      =    get_post_field('post_content', $post->ID);
        $team_facebook      =    get_post_meta($post->ID, 'fl_team_facebook', true);
        $team_instagram      =    get_post_meta($post->ID, 'fl_team_instagram', true);
        $team_linkedin      =    get_post_meta($post->ID, 'fl_team_linkedin', true);
        $team_twitter      =    get_post_meta($post->ID, 'fl_team_twitter', true);
        $team_email          =    get_post_meta($post->ID, 'fl_team_email', true);


        $list_items_markup .= sprintf(
            '<div class="cell">
                <div class="custom-post-type-cell-content">
				<img src="%1$s" srcSet="%2$s" alt="%3$s" />',
            $image_url,
            $image_srcset_url,
            $image_alt
        );

        $list_items_markup .= sprintf(
            '<div>%1$s</div>
			<div>%2$s</div>
			<div>%3$s</div>',
            $title,
            $team_position,
            $post_content
        );

        // $list_items_markup .= sprintf('<div class="grid-x grid-margin-x">');

        // if (isset($team_facebook[0])) {
        //     $list_items_markup .= sprintf(
        //         '<div class="cell auto social_icon_container">
		// 			<a href="%1$s">
		// 				<i class="fa fa-facebook"></i>
		// 			</a>
		// 		</div>',
        //         $team_facebook
        //     );
        // }

        // if (isset($team_twitter[0])) {
        //     $list_items_markup .= sprintf(
        //         '<div class="cell auto social_icon_container">
		// 			<a href="%1$s">
		// 				<i class="fa fa-twitter"></i>
		// 			</a>
		// 	</div>',
        //         $team_twitter
        //     );
        // }

        // if (isset($team_instagram[0])) {
        //     $list_items_markup .= sprintf(
        //         '<div class="cell auto social_icon_container">
		// 			<a href="%1$s">
		// 				<i class="fa fa-instagram"></i>
		// 			</a>
		// 	</div>',
        //         $team_instagram
        //     );
        // }

        // if (isset($team_linkedin[0])) {
        //     $list_items_markup .= sprintf(
        //         '<div class="cell auto social_icon_container">
		// 			<a href="%1$s">
		// 				<i class="fa fa-linkedin"></i>
		// 			</a>
		// 	</div>',
        //         $team_linkedin
        //     );
        // }

        // $list_items_markup .= sprintf('</div>');

        $list_items_markup .= sprintf('</div>');

        $list_items_markup .= sprintf('</div>');
    }

    $class = 'wp-block-futurelab-block-custom-post-type';

    $block_content = sprintf(
        '<div class="%1$s">
			<div class="grid-x grid-padding-x small-up-1 medium-up-2 large-up-3 alignwide">
				%2$s
			</div>
		</div>',
        esc_attr($class),
        $list_items_markup
    );

    return $block_content;
}

function custom_post_type_dynamic()
{
    register_block_type('futurelab/block-custom-post-type', array(
        // 'editor_script' => 'gutenberg-examples-05',
        'render_callback' => 'custom_post_type_render_callback',
        'attributes'      => array(
            'postType'      => array(
                'type' => 'string',
            ),
            'className'       => array(
                'type' => 'string',
            ),
        )
    ));
}
add_action('init', 'custom_post_type_dynamic');
