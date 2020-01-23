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
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for backend.
 */
function fl_block_base_futurelab_block_assets() { // phpcs:ignore
	// Register block styles for gutenberg. need to put this here and on fl_block_base_futurelab_block_assets, futurelab_enqueue_editor_assets
	wp_enqueue_style(
		'fl_block_base-futurelab-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )  // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_enqueue_script(
		'fl_block_base-futurelab-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend. this works fine, no need to change...
	wp_enqueue_style(
		'fl_block_base-futurelab-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// Enqueue our block filters
	wp_enqueue_script(
		'fl_block_base-futurelab-filters-js',
		plugins_url( '/dist/blocks.filters.js', dirname( __FILE__ ) ), // Block.filters.js: We register the block here. Built with Webpack.
		array( 'wp-hooks', 'lodash' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.filters.js' ),
		true
	);

	// adding local variables
	wp_localize_script(
		'fl_block_base-futurelab-block-js',
		'fl_url_data',
		array(
			'theme_url' => get_stylesheet_directory_uri(),
		)
	);

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
}
// Hook: Block assets.
add_action( 'enqueue_block_editor_assets', 'fl_block_base_futurelab_block_assets' );


/**
 * Enqueue frontend JavaScript and CSS assets.
 */
function fl_enqueue_frontend_assets() {
	// NB: Swiper assets are enqueued from the theme, where they are bundled with theme assets in the interests of efficiency
	// If in the backend, bail out.
	if ( is_admin() ) {
		return;
	}

	wp_enqueue_script(
		'futurelab/block-fl-block-base-frontend',
		plugins_url( '/dist/blocks.frontend.js', dirname( __FILE__ ) ),
		array( 'futurelab-swiper' ),
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.frontend.js' ),
		true
	);

	wp_enqueue_style(
		'fl_block_base-futurelab-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ), // Dependency to include the CSS after it.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )  // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);
}
add_action( 'wp_enqueue_scripts', 'fl_enqueue_frontend_assets' );

/**
 * Add Filter to add a block category
 */
function fl_add_new_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'fl-Blocks',
				'title' => __( 'FutureLab Blocks', 'fl-Blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', 'fl_add_new_block_category', 10, 2 );


/**
 * custom rest api for blocks
 */
function fl_create_api_fields() {
	// register rest field to team-members end point for block to show images
	register_rest_field(
		'fl_team_member',
		'teamMemberImage',
		array(
			'get_callback' => 'fl_get_team_member_image',
			10,
			4,
			'schema'       => null,
		)
	);
}
function fl_get_team_member_image( $data ) {

	$featured_image_id  = $data['featured_media']; // get featured image id
	$featured_image_url = wp_get_attachment_image_src( $featured_image_id, 'original' ); // get url of the original size

	if ( $featured_image_url ) {
		return $featured_image_url[0];
	}
}
add_action( 'rest_api_init', 'fl_create_api_fields' );

/**
 * Callback function to render clean HTML on the front-end.
 */
function futurelab_gutenberg_render_html( $attributes, $content ) {
	return html_entity_decode( $content );
}

/**
* Enqueue frontend.php to generate html
*/
require_once plugin_dir_path( __FILE__ ) . '/frontend.php';