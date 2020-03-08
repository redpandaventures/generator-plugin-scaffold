<?php
/**
 * Frontend class file.
 *
 * @package    <%= namespace %>/Front
 * @version    <%= version %>
 */

namespace <%= namespace %>\Front;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The front class handles all related functions for frontend view.
 *
 * @since     <%= version %>
 */
class Front {

	/**
	 * Init hooks
	 */
	public function init_hooks() {
		do_action( '<%= slug %>_front_loaded' );
	}

}
