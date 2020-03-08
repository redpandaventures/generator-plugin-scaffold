<?php 
/**
 * Init classes and setup our plugin.
 *
 * @package <%= namespace %>
 */

namespace <%= namespace %>; 

/**
 * Init classes and setup our plugin.
 */
class Plugin {
	/**
	 * Plugin constructor.
	 */
	public function __construct() {
		if ( $this->get_environment_warning() ) {
			add_action(
				'admin_notices',
				function () {
					printf(
						'<div class="notice notice-error"><p>%s</p></div>',
						esc_html( $this->get_environment_warning() )
					);
				}
			);
		}

		do_action( 'before_<%= slug %>_init' );

		$this->load_textdomain();
		$this->init_hooks();
		$this->init_classes();

		do_action( 'after_<%= slug %>_init' );
	}

	/**
	 * Load the plugin text domain.
	 */
	private function load_textdomain() {
		load_plugin_textdomain( '<%= slug %>', false, PLUGINSCAFFOLD_PLUGIN_BASENAME . '/languages' );
	}

	/**
	 * Call hooks here
	 * 
	 * @since     <%= version %>
	 */
	private function init_hooks() {

		// Only load in admin.
		if ( $this->is_request( 'admin' ) ) {
			$this->init_admin_classes();
		}

		// Only load in frontend.
		if ( $this->is_request( 'frontend' ) ) {
			$this->init_frontend_classes();
		}

	}

	/**
	 * Init required classes for this plugin to function.
	 * 
	 * @since     <%= version %>
	 */
	private function init_classes() {
		$this->init_admin_classes();
		$this->init_frontend_classes();
	}

	/**
	 * Init admin classes.
	 * 
	 * @since     <%= version %>
	 */
	private function init_admin_classes() {
		// init admin classes.
	}

	/**
	 * Init frontend classes.
	 * 
	 * @since     <%= version %>
	 */
	private function init_frontend_classes() {
		// init frontend classes.
	}

	/**
	 * What type of request is this?
	 * 
	 * @since  <%= version %>
	 * @param  string $type admin, ajax, cron or frontend.
	 * @return bool
	 */
	private function is_request( $type ) {
		switch ( $type ) {
			case 'admin':
				return is_admin();
			case 'ajax':
				return defined( 'DOING_AJAX' );
			case 'cron':
				return defined( 'DOING_CRON' );
			case 'frontend':
				return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
		}
	}

	/**
	 * Checks the environment for compatibility problems.  Returns a string with the first incompatibility
	 * found or false if the environment has no problems.
	 *
	 * @noinspection PhpUndefinedConstantInspection
	 * @since  <%= version %>
	 */
	private function get_environment_warning() {
		$output = '';

		if ( version_compare( phpversion(), <%= constant %>_MIN_PHP_VER, '<' ) ) {
			/* translators: %1$s: the minimum PHP version, %2$s: the current PHP version. */
			$message = __( '<%= name %> - The minimum PHP version required for this plugin is %1$s. You are running %2$s.', 'plugin-scaffold' );
			$output  = sprintf( $message, <%= constant %>_MIN_PHP_VER, phpversion() );
		}

		return $output;
	}
}
