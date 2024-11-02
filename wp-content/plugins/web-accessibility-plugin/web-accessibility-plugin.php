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
 * Author URI:        https://author.example.com/
 * License:           GPL v2 or later
 */

require_once plugin_dir_path(__FILE__) . 'includes/class-accessibility-settings.php';

if(!defined('ABSPATH')){
    die;
}

//Plugin Code
Class AccessibilityPlugin{

    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_accessibility_controls'));
    }

    // Enqueue CSS and JavaScript
    public function enqueue_scripts() {
        wp_enqueue_style('accessibility-style', plugin_dir_url(__FILE__) . 'assets/css/accessibility-style.css');
        wp_enqueue_script('accessibility-script', plugin_dir_url(__FILE__) . 'assets/js/accessibility-script.js', array('jquery'), null, true);
    }

    // Render Accessibility Controls in Footer
    public function render_accessibility_controls() {
        // echo '<div id="accessibility-controls">';
        // echo '<button class = "accessibility-button" id="increase-font">A+</button>';
        // echo '<button class = "accessibility-button" id="decrease-font">A-</button>';
        // echo '<button class = "accessibility-button" id="contrast-toggle">High Contrast</button>';
        // echo '<button class = "accessibility-button" id="grayscale-toggle">Grayscale</button>';
        // echo '<button class = "accessibility-button" id="sepia-toggle">Sepia</button>';
        // echo '<button class = "accessibility-button" id="contrast-dark">Dark Mode</button>';
        // echo '<button class = "accessibility-button" id="contrast-light">Light Mode</button>';
        // echo '<button class = "accessibility-button" id="contrast-blue">Blue Mode</button>';
        // echo '<button class = "accessibility-button" id="reset-toggle">Reset</button>';
        // echo '</div>';

        echo '<div class="accessibility-controls">
        <div class="accessibility-dropdown">
            <button id="accessibility-button" class="accessibility-button">Accessibility Options</button>
            <div class="accessibility-sub-buttons">
                <button class = "accessibility-button" id="increase-font">A+</button>
                <button class = "accessibility-button" id="decrease-font">A-</button>
                <button class = "accessibility-button" id="contrast-toggle">High Contrast</button>
                <button class = "accessibility-button" id="grayscale-toggle">Grayscale</button>
                <button class = "accessibility-button" id="sepia-toggle">Sepia</button>
                <button class = "accessibility-button" id="contrast-dark">Dark Mode</button>
                <button class = "accessibility-button" id="contrast-light">Light Mode</button>
                <button class = "accessibility-button" id="contrast-blue">Blue Mode</button>
                <button class = "accessibility-button" id="reset-toggle">Reset</button>
            </div>
        </div>
    </div>';
    }
   



    function activate_plugin(){
        AccessibilitySettings::activate();
    }
    function deactivate_plugin(){
        AccessibilitySettings::deactivate();
    }
}

//Class Validate
if(class_exists('AccessibilityPlugin')){
    $Plugin = new AccessibilityPlugin();
}

//Activation
register_activation_hook(__FILE__, array($Plugin, 'activate_plugin'));
//Deactivation
register_activation_hook(__FILE__, array($Plugin, 'deactivate_plugin'));
