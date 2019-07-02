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

// Enqueue JS and CSS
require_once plugin_dir_path(__FILE__) . '_init/register-scripts.php';

// Add Filter to add a block category
require_once plugin_dir_path(__FILE__) . '_init/block-categories.php';

// Enqueue frontend.php to generate html
require_once plugin_dir_path(__FILE__) . './frontend.php';

// Enqueue frontend.php to generate html
// require_once plugin_dir_path(__FILE__) . '_init/block-filters.php';

/**
 * Enqueue block filter JavaScript
 * TODO: DONT KNOW WHY CANT MOVE THIS TO _INIT FOLDER
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

add_action("enqueue_block_editor_assets", 'enqueue_block_filters', 100);
