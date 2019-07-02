<?php
/*
Plugin name: FutureLab custom endpoints
Plugin URI: https://futurelab.co.nz/
Description: A plugin for WordPress sites running Piano.
Author: FutureLab | Nic Wilson
Version: 1.0.0 Beta
Author URI: https://futurelab.co.nz/
*/

namespace FutureLab;


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

require_once( plugin_dir_path( __FILE__ ) . '/includes/routes.php' );

if ( is_admin() ) {
	require_once( plugin_dir_path( __FILE__ ) . '/includes/activate_deactivate.php' );
}

class custom_endpoints {

	/*
	 * Version is stored in options table as afp_version and checked on load
	 * There is an update function stub for use should you need it
	 *
	 */
	public $version = 'beta';

	protected static $instance = null;

	public static function init() {

		if ( null === self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public function __construct() {

		$version = get_option( 'fl_custom_api_version', false );

		if ( $version !== $this->version ) {

			self::custom_api_updated();
			update_option( 'fl_custom_api_version', $this->version );
		}

		$routes = new routes;
		add_action( 'rest_api_init', array( $routes, 'register_routes' ) );
		add_action( 'rest_api_init', array( $routes, 'register_fields' ) );

	}

	/**
	 * On plugin activation, the options are added and the AFP user is created (if it is missing)
	 */
	static function plugin_activated() {

		$activate = new activate_deactivate();
		$activate->activate();

	}

	/**
	 * On plugin deactivation we remove all the options and the cron job
	 * We leave the user behind.
	 */
	static function plugin_deactivated() {

		$deactivate = new activate_deactivate();
		$deactivate->deactivate();

	}

	/**
	 * Stub method for updating the plugin
	 */
	static function custom_api_updated() {

		/*
		 * For updates
		 */

	}

}

add_action( 'init', array( 'FutureLab\custom_endpoints', 'init' ) );
register_activation_hook( __FILE__, array( 'FutureLab\custom_endpoints', 'plugin_activated' ) );
register_deactivation_hook( __FILE__, array( 'FutureLab\custom_endpoints', 'plugin_deactivated' ) );