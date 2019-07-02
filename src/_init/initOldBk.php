<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package futurelab
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function fl_block_base_futurelab_block_assets()
{ // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'fl_block_base-futurelab-style-css', // Handle.
		plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), // Block style CSS.
		array('wp-editor'), // Dependency to include the CSS after it.
		filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css')  // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// move the function to enqueue_block_filters because of error 'The block must have a registered category'
	// Register block editor script for backend.
	wp_register_script(
		'fl_block_base-futurelab-block-js', // Handle.
		plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
		array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// adding local variables
	wp_localize_script(
		'fl_block_base-futurelab-block-js',
		'fl_url_data',
		array(
			'theme_url' => get_stylesheet_directory_uri()
		)
	);

	// Register block editor styles for backend. this works fine, no need to change...
	wp_register_style(
		'fl_block_base-futurelab-block-editor-css', // Handle.
		plugins_url('dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
		array('wp-edit-blocks'), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// only load this on page
	// if (is_home()) {
	//wp_enqueue_script('futurelab-base-swiper-js'); // register first
	//wp_enqueue_script('futurelab-base-swiper-js', get_template_directory_uri() . '/js/galleries.js', array(), '1.0');


	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'futurelab/block-fl-block-base',
		array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'fl_block_base-futurelab-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'fl_block_base-futurelab-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'fl_block_base-futurelab-block-editor-css',
		)
	);

	register_block_type(
		'futurelab/block-fl-block-slider2',
		array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'           => 'fl_block_base-futurelab-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script'   => 'fl_block_base-futurelab-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'    => 'fl_block_base-futurelab-block-editor-css',
			'render_callback' => 'futurelab_gutenberg_render_html',
		)
	);
}

/**
 * Add your third party editor only assets here. They are hooked to the enqueue_block_editor_assets, which means they will load
 * at the right time. If not, you will end up loading them on the frontend as well, which is unneccessary, since we have bundled
 * them with theme files.
 * Your register_block_type will take care to load necessary assets directly used by the blocks themselves. These are
 * Only assets such as swiper assets for sliders and galleries.
 */
function futurelab_enqueue_editor_assets()
{

	wp_enqueue_style('futurelab-base-swiper-css', get_template_directory_uri() . '/assets/swiper/css/swiper.min.css', array(), '1.0');
	wp_enqueue_script('futurelab-base-swiper-js', get_template_directory_uri() . '/assets/swiper/js/swiper.min.js', array(), '1.0');

	// wp_enqueue_style(
	// 	'fl_block_base-futurelab-style-css', // Handle.
	// 	plugins_url('dist/blocks.style.build.css', dirname(__FILE__)), // Block style CSS.
	// 	array('wp-editor'), // Dependency to include the CSS after it.
	// 	filemtime(plugin_dir_path(__DIR__) . 'dist/blocks.style.build.css')  // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	// );
}

// add_action( 'wp_enqueue_editor', 'futurelab_enqueue_editor_assets' );
add_action('wp_enqueue_scripts', 'futurelab_enqueue_editor_assets');


/**
 * Callback function to render clean HTML on the front-end.
 *
 * @param $attributes
 * @param $content
 *
 * @return string
 */
function futurelab_gutenberg_render_html($attributes, $content)
{
	return html_entity_decode($content);
}

// Hook: Block assets.
// add_action('enqueue_block_editor_assets', 'fl_block_base_futurelab_block_assets');
add_action('enqueue_block_editor_assets', 'fl_block_base_futurelab_block_assets');

// Enqueue frontend.php to generate html
require_once(plugin_dir_path(__FILE__) . '/frontend.php');

/**
 * Enqueue block filter JavaScript
 */
function enqueue_block_filters()
{
	// Register block editor script for backend.
	// wp_register_script(
	// 	'fl_block_base-futurelab-block-js', // Handle.
	// 	plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
	// 	array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Dependencies, defined above.
	// 	null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
	// 	true // Enqueue the script in the footer.
	// );

	// Enqueue our block filters
	wp_enqueue_script(
		"fl_block_base-futurelab-filters-js",
		plugins_url('/dist/blocks.filters.js', dirname(__FILE__)), // Block.filters.js: We register the block here. Built with Webpack.
		['wp-hooks', 'lodash'],
		microtime(),
		true
	);
}

add_action("enqueue_block_editor_assets", 'enqueue_block_filters');

/**
 * Enqueue frontend JavaScript and CSS assets.
 * NB: Swiper assets are enqueued from the theme, where they are bundled with theme assets
 * in the interests of efficiency
 */
function enqueue_frontend_assets()
{

	// If in the backend, bail out.
	if (is_admin()) {
		return;
	}

	wp_enqueue_script(
		'futurelab/block-fl-block-base-frontend',
		plugins_url( '/dist/blocks.frontend.js', dirname( __FILE__ ) ),
		['futurelab-swiper'],
		microtime(),
		true
	);

	// wp_enqueue_script(
	// 	'futurelab/block-fl-block-base-frontend',
	// 	plugins_url('/src/blocks/slider2/frontend.js', dirname(__FILE__)),
	// 	[],
	// 	microtime(),
	// 	true
	// );
}

add_action('wp_enqueue_scripts', 'enqueue_frontend_assets');

/**
 * Add Filter to add a block category
 */
function add_new_block_category($categories, $post)
{
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'fl-Blocks',
				'title' => __('FutureLab Blocks', 'fl-Blocks'),
			),
		)
	);
}

add_filter('block_categories', 'add_new_block_category', 10, 2);

// for block filters, not usings them now
// function myguten_enqueue()
// {
// 	wp_enqueue_script(
// 		'futurelab/block-fl-block-base-filter',
// 		plugins_url('src/flex-grid/enqueue.js', __FILE__),
// 		array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
// 		microtime()
// 	);
// }
// add_action('enqueue_block_editor_assets', 'myguten_enqueue');
