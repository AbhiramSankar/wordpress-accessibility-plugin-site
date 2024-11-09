<?php
/**
 * @package web-accessibility-plugin
 */
/*
 * Plugin Name:       WP Web Accessibility Plugin
 * Description:       This is a plugin for implementing the website accessibility features.
 * Version:           0.0.1
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Abhiram Sankar & Arth Ashwinbhai Patel 
 * License:           GPL v2 or later
 */

if (!defined('ABSPATH')) exit;

//DEfine plugin constant paths
define( 'PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'PLUGIN_URL', plugin_dir_url( __FILE__ ) );

//Call activation hook
require_once plugin_dir_path(__FILE__) . 'includes/class-wp-accessibility-activate.php';
register_activation_hook(__FILE__, array('WPAccessibilityActivate', 'activate'));

//Call deactivation hook
require_once plugin_dir_path(__FILE__) . 'includes/class-wp-accessibility-dectivate.php';
register_deactivation_hook(__FILE__, array('WPAccessibilityDeactivate', 'deactivate'));

//Call the class to run the plugin
require_once plugin_dir_path(__FILE__) . 'includes/class-wp-accessibility-init.php';
new WPAccessibilityInit();
