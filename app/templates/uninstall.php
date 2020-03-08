<?php 
/**
 * Fired when the plugin is uninstalled.
 *
 * @package <%= namespace %>
 * @version <%= version %>
 */

namespace <%= namespace %>;

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// unistall code goes here. 