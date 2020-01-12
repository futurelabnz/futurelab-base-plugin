<?php
/**
 * Plugin Name: fl-block-base — Futurelab Gutenberg Block Plugin
 * Description: fl-block-base — is a Gutenberg plugin created by futurelab.
 * Author: futurelab
 * Author URI: https://futurelab.co.nz/
 * Version: 1.0.1
 *
 * @package futurelab
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
