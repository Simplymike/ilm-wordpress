<?php defined('ABSPATH') || exit; ?>
<section class="ilm-news" aria-labelledby="ilm-news-title">
    <div class="wrapper">
        <h2 class="h2 ilm-news__heading" id="ilm-news-title">Новости Литейной Промышленности</h2>
        <div class="ilm-news__grid">
            <?php foreach ($news as $article) : ?>
                <article class="ilm-news__card">
                    <a class="ilm-news__link" href="<?php echo esc_url(get_permalink($article)); ?>">
                        <h3 class="ilm-news__title"><?php echo esc_html(get_the_title($article)); ?></h3>
                        <div class="ilm-news__photo">
                            <?php echo get_the_post_thumbnail($article, 'large', ['loading' => 'lazy']); ?>
                        </div>
                        <p class="ilm-news__excerpt"><?php echo esc_html(wp_strip_all_tags(get_the_excerpt($article))); ?></p>
                    </a>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
