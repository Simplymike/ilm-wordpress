(function () {
    'use strict';

    var header = document.querySelector('.header');
    if (!header) return;

    var banner = document.querySelector('.mainImage, .intro');
    var scheduled = false;

    function update() {
        scheduled = false;
        var height = header.offsetHeight;
        document.documentElement.style.setProperty('--site-header-height', height + 'px');
        header.classList.toggle('header--solid', !banner || banner.getBoundingClientRect().bottom <= height + 8);
    }

    function schedule() {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    update();
}());
