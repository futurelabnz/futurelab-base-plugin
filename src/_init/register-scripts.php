<?php

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction â€” structure of blocks.
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
        null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime â€” Gets file modification time.
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

// Hook: Block assets.
// add_action('enqueue_block_editor_assets', 'fl_block_base_futurelab_block_assets');
add_action('enqueue_block_editor_assets', 'fl_block_base_futurelab_block_assets');

/**
 * Enqueue block filter JavaScript
 */
function enqueue_block_filters()
{
    // Register block editor script for backend. // move back to fl_block_base_futurelab_block_assets because extend style not working
    // wp_register_script(
    // 	'fl_block_base-futurelab-block-js', // Handle.
    // 	plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
    // 	array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Dependencies, defined above.
    // 	null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime â€” Gets file modification time.
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
