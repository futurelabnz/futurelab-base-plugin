<?php
/**
 * Server-side rendering of the `core/latest-posts` block.
 *
 * @package WordPress
 */

/**
 * Renders the `core/latest-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_futurelab_news($attributes)
{
	$args = array(
		'posts_per_page'   => $attributes['postsToShow'],
		'post_status'      => 'publish',
		'order'            => $attributes['order'],
		'orderby'          => $attributes['orderBy'],
		'suppress_filters' => false,
	);

	if (isset($attributes['categories'])) {
		$args['category'] = $attributes['categories'];
	}

	$recent_posts = get_posts($args);

	$list_items_markup = '';

	$excerpt_length = $attributes['excerptLength'];

	foreach ($recent_posts as $post) {

		if (isset($attributes['displayCategory'])) {
			$category_detail = get_the_category($post->ID);
			$category_detail_str = '';
			foreach($category_detail as $cd){
				$category_detail_str .= ' ' . strtolower($cd->cat_name);
			}

		} else {
			$category_detail_str = '';
		}

		$thumbnail = get_the_post_thumbnail($post, 'large'); // change to "large" because i need image to cover the full column, Hank
		if (empty($thumbnail)) {
			$thumbnail = '<div class="image-placeholder"></div>';
		}

		$title = get_the_title($post);
		if (!$title) {
			$title = __('(Untitled)');
		}

		$list_items_markup .= sprintf('<li class="post-item%1$s">', $category_detail_str);

		$list_items_markup .= sprintf(
			'<a class="post-image" href="%1$s">%2$s</a>',
			esc_url(get_permalink($post)),
			$thumbnail
		);

		$list_items_markup .= sprintf(
			'<div class="post-more-arrow"></div>'
		);

		$list_items_markup .= '<div class="news-caption">';

		$list_items_markup .= sprintf(
			'<div class="post-text-content" style="top: 0px; position: relative;">'
		);

		if (isset($attributes['displayPostDate']) && $attributes['displayPostDate']) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-latest-posts__post-date">%2$s</time>',
				esc_attr(get_the_date('c', $post)),
				esc_html(get_the_date('M j, Y', $post))
			);
		}

		if (isset($category_detail_str) && $attributes['displayCategory']) {
			$list_items_markup .= sprintf(
				'<div class="post-category"><p class="post-category-name">%1$s</p></div>',
				strtoupper($category_detail_str)
			);
		}

		$list_items_markup .= sprintf(
			'<div class="post-title"><a href="%1$s">%2$s</a></div>',
			esc_url(get_permalink($post)),
			$title
		);

		if (
			isset($attributes['displayPostContent']) && $attributes['displayPostContent']
			&& isset($attributes['displayPostContentRadio']) && 'excerpt' == $attributes['displayPostContentRadio']
		) {
			$post_excerpt = $post->post_excerpt;
			if (!($post_excerpt)) {
				$post_excerpt = $post->post_content;
			}
			$trimmed_excerpt = esc_html(wp_trim_words($post_excerpt, $excerpt_length, ' &hellip; '));

			$list_items_markup .= sprintf(
				'<div class="wp-block-latest-posts__post-excerpt">%1$s',
				$trimmed_excerpt
			);

			if (strpos($trimmed_excerpt, ' &hellip; ') !== false) {
				$list_items_markup .= sprintf(
					'<a href="%1$s">%2$s</a></div>',
					esc_url(get_permalink($post)),
					__('Read More')
				);
			} else {
				$list_items_markup .= sprintf(
					'</div>'
				);
			}
		}

		if (
			isset($attributes['displayPostContent']) && $attributes['displayPostContent']
			&& isset($attributes['displayPostContentRadio']) && 'full_post' == $attributes['displayPostContentRadio']
		) {
			$list_items_markup .= sprintf(
				'<div class="wp-block-latest-posts__post-full-content">%1$s</div>',
				wp_kses_post(html_entity_decode($post->post_content, ENT_QUOTES, get_option('blog_charset')))
			);
		}

		$list_items_markup .= "</div></li>\n";
	}

	$class = 'wp-block-latest-posts wp-block-latest-posts__list';
	if (isset($attributes['align'])) {
		$class .= ' align' . $attributes['align'];
	}

	if (isset($attributes['postLayout']) && 'grid' === $attributes['postLayout']) {
		$class .= ' is-grid';
	}

	if (isset($attributes['columns']) && 'grid' === $attributes['postLayout']) {
		$class .= ' columns-' . $attributes['columns'];
	}

	if (isset($attributes['displayPostDate']) && $attributes['displayPostDate']) {
		$class .= ' has-dates';
	}

	if (isset($attributes['className'])) {
		$class .= ' ' . $attributes['className'];
	}

	$block_content = sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr($class),
		$list_items_markup
	);

	return $block_content;
}

/**
 * Registers the `core/latest-posts` block on server.
 */
function register_block_futurelab_news()
{
	register_block_type(
		'futurelab/latest-news',
		array(
			'attributes'      => array(
				'align'                   => array(
					'type' => 'string',
					'enum' => array('left', 'center', 'right', 'wide', 'full'),
				),
				'className'               => array(
					'type' => 'string',
				),
				'categories'              => array(
					'type' => 'string',
				),
				'postsToShow'             => array(
					'type'    => 'number',
					'default' => 5,
				),
				'displayPostContent'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayPostContentRadio' => array(
					'type'    => 'string',
					'default' => 'excerpt',
				),
				'excerptLength'           => array(
					'type'    => 'number',
					'default' => 55,
				),
				'displayPostDate'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'postLayout'              => array(
					'type'    => 'string',
					'default' => 'list',
				),
				'columns'                 => array(
					'type'    => 'number',
					'default' => 3,
				),
				'order'                   => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'                 => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'displayCategory'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback' => 'render_block_futurelab_news',
		)
	);
}

add_action('init', 'register_block_futurelab_news');
