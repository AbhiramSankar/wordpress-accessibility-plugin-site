<?php

class AccessibilitySettings {
    
    // Activation hook method
    public static function activate() {
        // Set default settings if they do not exist
        $default_settings = array(
            'font_size' => 16,
            'contrast_mode' => false,
        );
        
        // Add the settings to the options table if they are not set
        if (!get_option('accessibility_settings')) {
            add_option('accessibility_settings', $default_settings);
        }
    }

    // Deactivation hook method
    public static function deactivate() {
        // Optionally, you could clean up settings or temporary data here
        // Uncomment the line below if you want to delete settings on deactivation
        // delete_option('accessibility_settings');
    }

    // Uninstall hook method (if needed for complete cleanup)
    public static function uninstall() {
        // Remove all plugin data from the database on uninstall
        delete_option('accessibility_settings');
    }

    // Retrieve the settings
    public static function get_settings() {
        return get_option('accessibility_settings', array(
            'font_size' => 16,
            'contrast_mode' => false,
        ));
    }

    // Update specific settings
    public static function update_setting($key, $value) {
        $settings = self::get_settings();
        $settings[$key] = $value;
        update_option('accessibility_settings', $settings);
    }
}

?>
