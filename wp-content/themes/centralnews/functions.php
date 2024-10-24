<?php
if (!function_exists('centralnews_theme_enqueue_styles')) {
    add_action('wp_enqueue_scripts', 'centralnews_theme_enqueue_styles');

    function centralnews_theme_enqueue_styles()
    {
        $min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';
        $centralnews_version = wp_get_theme()->get('Version');
        $parent_style = 'morenews-style';

        // Enqueue Parent and Child Theme Styles
        wp_enqueue_style('bootstrap', get_template_directory_uri() . '/assets/bootstrap/css/bootstrap' . $min . '.css', array(), $centralnews_version);
        wp_enqueue_style($parent_style, get_template_directory_uri() . '/style' . $min . '.css', array(), $centralnews_version);
        wp_enqueue_style(
            'centralnews',
            get_stylesheet_directory_uri() . '/style.css',
            array('bootstrap', $parent_style),
            $centralnews_version
        );

        // Enqueue RTL Styles if the site is in RTL mode
        if (is_rtl()) {
            wp_enqueue_style(
                'morenews-rtl',
                get_template_directory_uri() . '/rtl.css',
                array($parent_style),
                $centralnews_version
            );
        }
    }
}

// Set up the WordPress core custom background feature.
add_theme_support('custom-background', apply_filters('morenews_custom_background_args', array(
    'default-color' => 'f5f5f5',
    'default-image' => '',
)));



function centralnews_override_morenews_header_section()
{
    remove_action('morenews_action_header_section', 'morenews_header_section', 40);
}

add_action('wp_loaded', 'centralnews_override_morenews_header_section');

function centralnews_header_section()
{

    $morenews_header_layout = morenews_get_option('header_layout');


?>

    <header id="masthead" class="<?php echo esc_attr($morenews_header_layout); ?> morenews-header">
        <?php morenews_get_block('layout-centered', 'header');  ?>
    </header>

<?php
}

add_action('morenews_action_header_section', 'centralnews_header_section', 40);

function centralnews_filter_default_theme_options($defaults)
{
    $defaults['site_title_font_size'] = 72;
    $defaults['site_title_uppercase']  = 0;
    $defaults['disable_header_image_tint_overlay']  = 1;
    $defaults['show_primary_menu_desc']  = 0;
    $defaults['header_layout'] = 'header-layout-centered';
    $defaults['aft_custom_title']           = __('Video', 'centralnews');
    $defaults['secondary_color'] = '#BF0A30';
    $defaults['global_show_min_read'] = 'no';
    $defaults['frontpage_content_type']  = 'frontpage-widgets-and-content';
    return $defaults;
}
add_filter('morenews_filter_default_theme_options', 'centralnews_filter_default_theme_options', 1);



/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function centralnews_widgets_init()
{

    register_sidebar(array(
        'name'          => esc_html__('Above Main Banner Section', 'centralnews'),
        'id'            => 'home-above-main-banner-widgets',
        'before_widget' => '<div id="%1$s" class="widget morenews-widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h2 class="widget-title widget-title-1"><span class="heading-line-before"></span><span class="heading-line">',
        'after_title' => '</span><span class="heading-line-after"></span></h2>',
    ));
}

add_action('widgets_init', 'centralnews_widgets_init');
