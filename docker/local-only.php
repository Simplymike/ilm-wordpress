<?php
/**
 * Plugin Name: ILM Local Only
 */

if (wp_get_environment_type() === 'local') {
    add_filter('pre_wp_mail', '__return_false');
    add_filter('pre_option_blog_public', '__return_zero');
}
