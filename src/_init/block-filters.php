<?php
/**
 * Enqueue block filter JavaScript
 */
function enqueue_block_filters()
{
    // Register block editor script for backend.
    wp_register_script(
        'fl_block_base-futurelab-block-js', // Handle.
        plugins_url('/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
        array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Dependencies, defined above.
        null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime â€” Gets file modification time.
        true // Enqueue the script in the footer.
    );

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