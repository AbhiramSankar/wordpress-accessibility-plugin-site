<?php
class WPAccessibilityActivate
{

    // Activation hook method
    public static function activate()
    {
        flush_rewrite_rules();
    }

}