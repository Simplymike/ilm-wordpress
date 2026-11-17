$(function(){

    // MOBILE MENU TOGGLE FUNCTION

        $('.header__toggle').on('click', function(){

            $(this).toggleClass('header__toggle--active');
            $('.mobileMenu').toggleClass('mobileMenu--active');
            $('.header').toggleClass('header--active');
            $('body').toggleClass('overflow');
        });

        $('.item-mobileMenu__toggle').on('click', function(){
            $(this).toggleClass('item-mobileMenu__toggle--active');
            $(this).closest('.item-mobileMenu').find('.mobileMenu__sublist').slideToggle();
        });

        //MAINIMAGE SLIDER

        var mainImageSlider = new Swiper('.mainImage__slider', {
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            speed: 1700,
            spaceBetween: 0,
            preventClicks: false,
            autoplay: {
                delay: 4000,
            },
        });


       // CERTIFICATES SLIDER 
       
       var certificatesSlider = new Swiper('.certificates__slider', {
        slidesPerView: 'auto',
        speed: 1000,
        spaceBetween: 48,
        observer: true,
        breakpoints: {
            0: {
                spaceBetween: 16,
                allowTouchMove: true

            },
            767: {
                spaceBetween: 16,

            },
            1200: {
                spaceBetween: 48,
                allowTouchMove: false
            }

        },
    });

    
       // CATALOGS SLIDER 

       var catalogsSlider = new Swiper('.catalogs__slider', {
        slidesPerView: 'auto',
        speed: 1000,
        spaceBetween: 48,
        observer: true,
        breakpoints: {
            0: {
                spaceBetween: 16,
                allowTouchMove: true

            },
            767: {
                spaceBetween: 16,

            },
            1200: {
                spaceBetween: 48,
                allowTouchMove: false
            }

        },
    });
    
    //JUST SLIDER

    var justSlider = new Swiper('.justSlider', {
        slidesPerView: 'auto',
        speed: 1700,
        spaceBetween: 1,
        preventClicks: false,
        autoplay: {
            delay: 6000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

        // GALLERY SLIDERS FUNCTION

        var bottomGallerySlider = new Swiper(".bottom-gallery__slider", {
            slidesPerView: 'auto',

            spaceBetween: 14,
            breakpoints: {
                0: {
                    spaceBetween: 12,
    
                },
                767: {
                    spaceBetween: 12,
    
                },
                1200: {
                    spaceBetween: 14,
                }
    
            },
            slideToClickedSlide: true,
            speed: 1000,
            spaceBetween: 14,
    
        });
    
        var topGallerySlider = new Swiper(".top-gallery__slider", {
            speed: 1000,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            observer: true,
            slideToClickedSlide: true,
            spaceBetween: 14,
            slidesPerView: 1,
            thumbs: {
                swiper: bottomGallerySlider
            }
    
        });

    // LOCATION MAP API


    if ($('#locationMap').length > 0) {

        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map("locationMap", {
                center: [59.737709, 30.567091],
                zoom: 12,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });

			var myPlacemark = new ymaps.Placemark([59.737709, 30.567091], {
                balloonContent: '196657, г.Санкт-Петербург, Колпино, ул. Металлургов д. 15, оф. 88',
            }, {
                // hintLayout: HintLayout,
                iconLayout: 'default#image',
                iconImageHref: '/images/img/location/map__pin.png',
                iconImageSize: [83, 109],
				iconImageOffset: [-41, -109],
                iconCaption: "Диаграмма",
            });

                      myPlacemark.events.add("click", function () {
                myMap.setZoom(17);
                myMap.setCenter([59.737709, 30.567091], 17, {
                    checkZoomRange: true
                });
            });

            myMap.geoObjects.add(myPlacemark);
        }
    }

});
