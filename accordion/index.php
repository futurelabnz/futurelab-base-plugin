<?php
/**
 * Plugin Name: Futurelab accordion
 *
 * @package futurelab-base-plugin-accordion
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', 'futurelab_base_plugin_accordion_load_textdomain' );

function futurelab_base_plugin_accordion_load_textdomain() {
	load_plugin_textdomain( 'futurelab-base-plugin', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function futurelab_base_plugin_accordion_register_block() {

	// automatically load dependencies and version.
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'futurelab-base-plugin-accordion',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'futurelab-base-plugin-accordion-editor',
		plugins_url( 'build/index.css', __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.css' )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'futurelab-base-plugin-accordion-style',
		plugins_url( $style_css, __FILE__ ),
		[],
		filemtime( plugin_dir_path( __FILE__ ) . $style_css ),
	);

	register_block_type(
		'futurelab-base-plugin/accordion',
		[
			'editor_script' => 'futurelab-base-plugin-accordion',
			'editor_style'  => 'futurelab-base-plugin-accordion-editor',
			'style'  => 'futurelab-base-plugin-accordion-style',
		]
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		/**
		 * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
		 * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
		 * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
		 */
		wp_set_script_translations( 'futurelab-base-plugin-accordion', 'futurelab-base-plugin' );
	}

	wp_enqueue_script(
		'flb-accordion-init-script',
		plugins_url( 'src/frontend.js', __FILE__ ),
		[ 'jquery' ],
		filemtime( plugin_dir_path( __FILE__ ) . 'src/frontend.js' ),
		true
	);

}
add_action( 'init', 'futurelab_base_plugin_accordion_register_block', 999 );
