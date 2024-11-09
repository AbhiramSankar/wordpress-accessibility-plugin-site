<?php
class WPAccessibilityDeactivate
{

    // Deactivation hook method
    public static function deactivate()
    {
        flush_rewrite_rules();
    }

}