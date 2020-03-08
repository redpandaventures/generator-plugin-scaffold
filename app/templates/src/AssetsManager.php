<?php
/**
 * Manage assets for plugin.
 *
* @package <%= namespace %>
 */

namespace <%= namespace %>; 

/**
 * Manage assets for our plugin.
 */
class AssetsManager {
	/**
	 * Initialize WordPress hooks.
	 */
	public function init_hooks() {
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
	}

	/**
	 * Registere script to use in the plugin.
	 */
	public function register_scripts() {
		if ( is_admin() ) {
			// Load assets only for admin.
		} else {
			// Load assets only for frontend.
		}

		// Load assets used for both.
	}
}
