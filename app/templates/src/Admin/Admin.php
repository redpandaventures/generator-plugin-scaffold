<?php
/**
 * Admin class file.
 *
* @package    <%= namespace %>/Front
 * @version    <%= version %>
 */

namespace <%= namespace %>\Admin;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The admin class handles all related functions for admin view.
 *
 * @version     0.1.0
 */
class Admin {

	/**
	 * Init hooks
	 */
	public function init_hooks() {
		do_action( '<%= slug %>_admin_loaded' );
	}

}
