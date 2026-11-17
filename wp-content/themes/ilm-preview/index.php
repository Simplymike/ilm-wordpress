<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php echo ilm_preview_markup('header'); ?>
<main class="main">
<?php while (have_posts()) : the_post(); ?>
  <?php if (is_singular('post')) : ?>
    <article class="wrapper ilm-news-article">
      <h1 class="h1"><?php the_title(); ?></h1>
      <?php the_post_thumbnail('large'); ?>
      <?php the_content(); ?>
    </article>
  <?php else : ?>
    <?php the_content(); ?>
  <?php endif; ?>
<?php endwhile; ?>
</main>
<?php echo ilm_preview_markup('footer'); ?>
<?php wp_footer(); ?>
</body>
</html>
