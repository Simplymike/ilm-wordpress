<?php
// Updated for GitHub deployment - 2026-11-17 12:19

add_action('after_setup_theme', function () {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails', ['post']);
});

add_action('wp_enqueue_scripts', function () {
    $base = get_template_directory_uri() . '/assets/templates/izoralitmash.ru';
    wp_enqueue_style('ilm-base', $base . '/css/main.min.css', [], '0.1.0');
    wp_enqueue_style('ilm-site', $base . '/css/style2.css', ['ilm-base'], '0.1.0');
    wp_enqueue_style('ilm-news', get_stylesheet_uri(), ['ilm-site'], wp_get_theme()->get('Version'));
    wp_enqueue_script('ilm-interactions', $base . '/js/scripts.min.js', [], '0.1.0', true);
    wp_enqueue_script('ilm-header', $base . '/js/header.js', [], '0.1.0', true);
});

add_filter('the_content', function ($content) {
    if (!is_front_page() || !is_main_query() || !in_the_loop()) {
        return $content;
    }
    if (!preg_match('/<section\b[^>]*\bclass="[^"]*\babout\b[^"]*"/', $content, $section, PREG_OFFSET_CAPTURE)) {
        return $content;
    }

    $news = get_posts([
        'category_name' => 'liteynye-novosti',
        'numberposts' => 2,
        'post_status' => 'publish',
        'ignore_sticky_posts' => true,
    ]);
    if (!$news) {
        return $content;
    }

    ob_start();
    require get_template_directory() . '/news.php';
    $offset = $section[0][1];
    return substr_replace($content, ob_get_clean(), $offset, 0);
}, 20);

function ilm_preview_markup($name) {
    $markup = file_get_contents(get_template_directory() . '/' . $name . '.html');
    return str_replace('{{ILM_ASSETS}}', esc_url(get_template_directory_uri() . '/assets'), $markup);
}

add_action('admin_menu', function () {
    add_theme_page('Импорт страниц ИжораЛитМаш', 'Импорт страниц ИжораЛитМаш',
        'manage_options', 'ilm-preview', 'ilm_preview_import_screen');
});

function ilm_preview_import_screen() {
    if (!current_user_can('manage_options')) {
        return;
    }
    if (isset($_POST['ilm_import'])) {
        check_admin_referer('ilm_preview_import');
        $pages = json_decode(file_get_contents(get_template_directory() . '/pages.json'), true);
        if (!$pages) {
            wp_die('Не удалось прочитать список страниц.');
        }
        $existing_pages = [];
        foreach ($pages as $path => $page) {
            $existing = get_page_by_path($path);
            if ($existing && !get_post_meta($existing->ID, '_ilm_preview_import', true)) {
                wp_die('Адрес уже занят: ' . esc_html($path));
            }
            $existing_pages[$path] = $existing;
        }
        $ids = [];
        $created = 0;
        foreach ($pages as $path => [$title, $source]) {
            $existing = $existing_pages[$path];
            $parent_path = dirname($path);
            $parent_id = $parent_path === '.' ? 0 : $ids[$parent_path];
            $id = $existing ? $existing->ID : wp_insert_post(wp_slash([
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_name' => basename($path),
                'post_parent' => $parent_id,
                'post_title' => $title,
                'post_content' => ilm_preview_markup($source),
                'meta_input' => ['_ilm_preview_import' => 1],
            ]), true);
            if (is_wp_error($id)) {
                echo '<div class="notice notice-error"><p>' . esc_html($id->get_error_message()) . '</p></div>';
                break;
            }
            $ids[$path] = $id;
            $created += $existing ? 0 : 1;
        }
        if (count($ids) === count($pages)) {
            update_option('page_on_front', $ids['ilm-home']);
            update_option('show_on_front', 'page');
            if (!get_option('permalink_structure')) {
                global $wp_rewrite;
                $wp_rewrite->set_permalink_structure('/%postname%/');
                flush_rewrite_rules();
            }
            printf('<div class="notice notice-success"><p>Создано страниц: %d. Всего доступно: %d.</p></div>', $created, count($ids));
        }
    }
    echo '<div class="wrap"><h1>Импорт страниц ИжораЛитМаш</h1>';
    echo '<p>Создаёт недостающие страницы сайта. Содержимое ранее импортированных страниц сохраняется.</p><form method="post">';
    wp_nonce_field('ilm_preview_import');
    submit_button('Импортировать страницы', 'primary', 'ilm_import');
    echo '</form></div>';
}

