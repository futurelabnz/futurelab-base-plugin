<?php

/**
 * Plugin Name: Futurelab latest-posts-flv2
 *
 * @package futurelab-base-plugin-latest-posts-flv2
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'futurelab_base_plugin_latest_posts_flv2_load_textdomain' );

function futurelab_base_plugin_latest_posts_flv2_load_textdomain() {
	load_plugin_textdomain( 'futurelab-base-plugin', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function futurelab_base_plugin_latest_posts_flv2_register_block() {

	// automatically load dependencies and version
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'futurelab-base-plugin-latest-posts-flv2',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'futurelab-base-plugin-latest-posts-flv2-editor',
		plugins_url( 'build/index.css', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.css' )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'futurelab-base-plugin-latest-posts-flv2-style',
		plugins_url( $style_css, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $style_css ),
	);

	register_block_type(
		'futurelab-base-plugin/latest-posts-flv2',
		[
			'attributes' =>
			[
				'categories' =>
				[
					'type' => 'array',
					'items' =>
					[
						'type' => 'object',
					],
				],
				'selectedAuthor' =>
				[
					'type' => 'number',
				],
				'postsToShow' =>
				[
					'type' => 'number',
					'default' => 5,
				],
				'displayPostContent' =>
				[
					'type' => 'boolean',
					'default' => false,
				],
				'displayPostContentRadio' =>
				[
					'type' => 'string',
					'default' => 'excerpt',
				],
				'excerptLength' =>
				[
					'type' => 'number',
					'default' => 55,
				],
				'displayAuthor' =>
				[
					'type' => 'boolean',
					'default' => false,
				],
				'displayPostDate' =>
				[
					'type' => 'boolean',
					'default' => false,
				],
				'postLayout' =>
				[
					'type' => 'string',
					'default' => 'list',
				],
				'columns' =>
				[
					'type' => 'number',
					'default' => 3,
				],
				'order' =>
				[
					'type' => 'string',
					'default' => 'desc',
				],
				'orderBy' =>
				[
					'type' => 'string',
					'default' => 'date',
				],
				'displayFeaturedImage' =>
				[
					'type' => 'boolean',
					'default' => false,
				],
				'featuredImageAlign' =>
				[
					'type' => 'string',
					'enum' =>
					[
						0 => 'left',
						1 => 'center',
						2 => 'right',
					],
				],
				'featuredImageSizeSlug' =>
				[
					'type' => 'string',
					'default' => 'thumbnail',
				],
				'featuredImageSizeWidth' =>
				[
					'type' => 'number',
					'default' => null,
				],
				'featuredImageSizeHeight' =>
				[
					'type' => 'number',
					'default' => null,
				],
				'addLinkToFeaturedImage' =>
				[
					'type' => 'boolean',
					'default' => false,
				],
			],
			'supports' =>
			[
				'align' => true,
				'html' => false,
			],
			'render_callback' => 'render_block_base_latest_posts_flv2',
			'editor_script' => 'futurelab-base-plugin-latest-posts-flv2',
			'editor_style'  => 'futurelab-base-plugin-latest-posts-flv2-editor',
			'style'  => 'futurelab-base-plugin-latest-posts-flv2-style',
		]
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		/**
		 * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
		 * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
		 * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
		 */
		wp_set_script_translations( 'futurelab-base-plugin-latest-posts-flv2', 'futurelab-base-plugin' );
	}

	// $editor_css = 'build/index.css';
	// wp_enqueue_style(
	// 'futurelab-base-plugin-latest-posts-flv2-style-editor',
	// plugins_url( $editor_css, __FILE__ ),
	// array(),
	// filemtime( plugin_dir_path( __FILE__ ) . $editor_css),
	// );
}
add_action( 'init', 'futurelab_base_plugin_latest_posts_flv2_register_block', 999 );

/**
 * Server-side rendering of the `core/latest-posts` block.
 *
 * @package WordPress
 */

/**
 * The excerpt length set by the Latest Posts core block
 * set at render time and used by the block itself.
 *
 * @var int
 */
$block_base_latest_posts_flv2_excerpt_length = 0;

/**
 * Callback for the excerpt_length filter used by
 * the Latest Posts block at render time.
 *
 * @return int Returns the global $block_base_latest_posts_flv2_excerpt_length variable
 *             to allow the excerpt_length filter respect the Latest Block setting.
 */
function block_base_latest_posts_flv2_get_excerpt_length() {
	global $block_base_latest_posts_flv2_excerpt_length;
	return $block_base_latest_posts_flv2_excerpt_length;
}

/**
 * Renders the `core/latest-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with latest posts added.
 */
function render_block_base_latest_posts_flv2( $attributes ) {
	global $post, $block_base_latest_posts_flv2_excerpt_length;

	$args = [
		'posts_per_page'   => $attributes['postsToShow'],
		'post_status'      => 'publish',
		'order'            => $attributes['order'],
		'orderby'          => $attributes['orderBy'],
		'suppress_filters' => false,
	];

	$block_base_latest_posts_flv2_excerpt_length = $attributes['excerptLength'];
	add_filter( 'excerpt_length', 'block_base_latest_posts_flv2_get_excerpt_length', 20 );

	if ( isset( $attributes['categories'] ) ) {
		$args['category__in'] = array_column( $attributes['categories'], 'id' );
	}
	if ( isset( $attributes['selectedAuthor'] ) ) {
		$args['author'] = $attributes['selectedAuthor'];
	}

	$recent_posts = get_posts( $args );

	$list_items_markup = '';

	foreach ( $recent_posts as $post ) {
		$post_link = esc_url( get_permalink( $post ) );

		$fl_has_post_thumbnail = ' ';
		if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
			$fl_has_post_thumbnail .= 'fl_has_post_thumbnail';
		};

		$list_items_markup .= '<li class="lastest-post-v2-item' . $fl_has_post_thumbnail . '">';

		if ( $attributes['displayFeaturedImage'] && has_post_thumbnail( $post ) ) {
			$image_style = '';
			if ( isset( $attributes['featuredImageSizeWidth'] ) ) {
				$image_style .= sprintf( 'max-width:%spx;', $attributes['featuredImageSizeWidth'] );
			}
			if ( isset( $attributes['featuredImageSizeHeight'] ) ) {
				$image_style .= sprintf( 'max-height:%spx;', $attributes['featuredImageSizeHeight'] );
			}

			$image_classes = 'wp-block-latest-posts__featured-image';
			if ( isset( $attributes['featuredImageAlign'] ) ) {
				$image_classes .= ' align' . $attributes['featuredImageAlign'];
			}

			$featured_image = get_the_post_thumbnail(
				$post,
				$attributes['featuredImageSizeSlug'],
				[
					'style' => $image_style,
				]
			);
			if ( $attributes['addLinkToFeaturedImage'] ) {
				$featured_image = sprintf(
					'<a class="link-on-featured-img" href="%1$s">%2$s</a>',
					$post_link,
					$featured_image
				);
			}
			$list_items_markup .= sprintf(
				'<div class="%1$s">%2$s</div>',
				$image_classes,
				$featured_image
			);
		}

		$title = get_the_title( $post );
		if ( ! $title ) {
			$title = __( '(no title)' );
		}
		$list_items_markup .= sprintf(
			'<a class="link-on-title" href="%1$s">%2$s</a>',
			$post_link,
			$title
		);

		if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
			$author_display_name = get_the_author_meta( 'display_name', $post->post_author );

			/* translators: byline. %s: current author. */
			$byline = sprintf( __( 'by %s' ), $author_display_name );

			if ( ! empty( $author_display_name ) ) {
				$list_items_markup .= sprintf(
					'<div class="wp-block-latest-posts__post-author">%1$s</div>',
					esc_html( $byline )
				);
			}
		}

		if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-latest-posts__post-date">%2$s</time>',
				esc_attr( get_the_date( 'c', $post ) ),
				esc_html( get_the_date( '', $post ) )
			);
		}

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
			&& isset( $attributes['displayPostContentRadio'] ) && 'excerpt' === $attributes['displayPostContentRadio'] ) {

			$trimmed_excerpt = get_the_excerpt( $post );

			$list_items_markup .= sprintf(
				'<div class="wp-block-latest-posts__post-excerpt">%1$s</div>',
				$trimmed_excerpt
			);
		}

		if ( isset( $attributes['displayPostContent'] ) && $attributes['displayPostContent']
			&& isset( $attributes['displayPostContentRadio'] ) && 'full_post' === $attributes['displayPostContentRadio'] ) {
			$list_items_markup .= sprintf(
				'<div class="wp-block-latest-posts__post-full-content">%1$s</div>',
				wp_kses_post( html_entity_decode( $post->post_content, ENT_QUOTES, get_option( 'blog_charset' ) ) )
			);
		}

		$list_items_markup .= "</li>\n";
	}

	remove_filter( 'excerpt_length', 'block_base_latest_posts_flv2_get_excerpt_length', 20 );

	$class = 'wp-block-latest-posts wp-block-latest-posts__list';

	if ( isset( $attributes['postLayout'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' is-grid';
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' columns-' . $attributes['columns'];
	}

	if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
		$class .= ' has-dates';
	}

	if ( isset( $attributes['displayAuthor'] ) && $attributes['displayAuthor'] ) {
		$class .= ' has-author';
	}

	$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $class ] );

	return sprintf(
		'<div class="wp-block-latest-posts-container"><ul %1$s>%2$s</ul></div>',
		$wrapper_attributes,
		$list_items_markup
	);
}

// /**
// * Registers the `core/latest-posts` block on server.
// */
// function register_block_base_latest_posts_flv2() {
// register_block_type_from_metadata(
// __DIR__ . '/src',
// array(
// 'render_callback' => 'render_block_base_latest_posts_flv2',
// )
// );
// }
// add_action( 'init', 'register_block_base_latest_posts_flv2' );

/**
 * Handles outdated versions of the `core/latest-posts` block by converting
 * attribute `categories` from a numeric string to an array with key `id`.
 *
 * This is done to accommodate the changes introduced in #20781 that sought to
 * add support for multiple categories to the block. However, given that this
 * block is dynamic, the usual provisions for block migration are insufficient,
 * as they only act when a block is loaded in the editor.
 *
 * TODO: Remove when and if the bottom client-side deprecation for this block
 * is removed.
 *
 * @param array $block A single parsed block object.
 *
 * @return array The migrated block object.
 */
function block_base_latest_posts_flv2_migrate_categories( $block ) {
	if (
		'core/latest-posts' === $block['blockName'] &&
		! empty( $block['attrs']['categories'] ) &&
		is_string( $block['attrs']['categories'] )
	) {
		$block['attrs']['categories'] = [
			[ 'id' => absint( $block['attrs']['categories'] ) ],
		];
	}

	return $block;
}
add_filter( 'render_block_data', 'block_base_latest_posts_flv2_migrate_categories' );
