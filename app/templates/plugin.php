<?php
/**
 * Plugin Name: <%= name %>
 * Plugin URI:  <%= homepage %>
 * Description: <%= description %>
 * Version:     <%= version %>
 * Author:      <%= author %>
 * Author URI:  <%= authorurl %>
 * Donate link: <%= homepage %>
 * License:     <%= license %>
 * License URI: <%= licenseuri %>
 * Text Domain: <%= slug %>
 * Domain Path: /languages
 * 
 * Requires at least:    <%= wp_requires %> 
 * Tested up to:         <%= wp_tested %> 
 *
 * @link    <%= homepage %>
 *
 * @package <%= namespace %>
 * @version <%= version %>
 *
 * Built using generator-plugin-scaffold (https://github.com/redpandaventures/generator-plugin-scaffold)
 */
<% if ( license == 'GPLv2' ) { %>
/**
 * Copyright (c) <%= year %> <%= author %> (email : <%= authoremail %>)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 2 or, at
 * your discretion, any later version, as published by the Free
 * Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */<% } else { %>
/**
 * Copyright (c) <%= year %> <%= author %> (email : <%= authoremail %>)
 */<% } %>

namespace <%= namespace %>;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( '<%= constant %>_VERSION', '<%= version %>' );
define( '<%= constant %>_MIN_PHP_VER', '7.2.0' );
define( '<%= constant %>_PLUGIN_PATH', dirname( __FILE__ ) . '/' );
define( '<%= constant %>_PLUGIN_FILE', __FILE__ );
define( '<%= constant %>_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( '<%= constant %>_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( '<%= constant %>_TEMPLATE_DEBUG_MODE', false );


/**
 * Use Jetpack autoloader instead of default Composer one.
 */
require_once plugin_dir_path( __FILE__ ) . '/vendor/autoload_packages.php';

add_action(
	'plugins_loaded',
	function() {
		new Plugin();
		do_action( '<%= slug %>_loaded' );
	}
);


/**
 * Activation hook.
 */
register_activation_hook(
	__FILE__,
	function () {
		update_option( '<%= slug %>_activated', true );
		do_action( '<%= slug %>_activate' );
	}
);

/**
 * Deactivation hook.
 */
register_deactivation_hook(
	__FILE__,
	function () {
		update_option( '<%= slug %>_activated', false );
		do_action( '<%= slug %>_deactivate' );
	}
);