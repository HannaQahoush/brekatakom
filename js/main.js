(function ($) {
    "use strict";
    // GLOBAL VARIABLES
    var header = $(".header"),
        wrapper = $('.wrapper');
    // PRELOADER
    preloader();
    function preloader(){
        setTimeout(function () {
            wrapper.addClass('wrapper_ready-load');
        }, 0);
    }
    // Opening the mobile menu
    navInit();
    function navInit() {
        header.find(".nav-toggle").on("click", function () {
            $(this).closest(header).toggleClass("header_menu-active");
        });
        function resizeNavMenu() {
            if ($(window).innerWidth()> 1024){
                if (header.hasClass('header_menu-active')){
                    header.removeClass('header_menu-active');
                }
            }
        }

        $(document).mouseup(function (e){
            if($(".header.header_menu-active").length) {
                var div = $(".header-nav");
                if (!div.is(e.target) && div.has(e.target).length === 0) {
                    header.removeClass('header_menu-active');
                }
            }
        });

        $(window).resize(function () {
            resizeNavMenu();
        });
    }

    // Page scroll animation
    $(window).on('load resize scroll', function () {
        if ($(window).scrollTop() >= 1) {
            header.addClass('header-scroll');
        } else {
            header.removeClass('header-scroll');
        }
    });

    // Popup initialization
    popupInit();
    function popupInit() {
        let popupName,
            body = $('body');
        // Popup call
        $(document).on('click', '.popup-init', function () {
            body.addClass("popup-visible").find(".popup").removeClass("active");
            popupName = $(this).data("popupname");
            body.find("."+ popupName + "").addClass("active");
        });
        // Close on click outside the popup
        $(document).mouseup(function (e){
            if($(".popup.active").length) {
                var div = $(".popup.active");
                if (!div.is(e.target) && div.has(e.target).length === 0) {
                    body.removeClass("popup-visible").find(".popup").removeClass("active");
                }
            }
        });
        // Cross Closure
        $(document).on('click', '.popup-remove', function () {
            body.removeClass("popup-visible").find(".popup").removeClass("active");
        });
        // Close by Esc
        document.onkeydown = function(e) {
            if(e.key === "Escape") {
                body.removeClass("popup-visible").find(".popup").removeClass("active");
            }
        };
    }

    smoothScroll();
    function smoothScroll(){
        $('a[href*="#"]:not([href="#"])').click(function (e) {
            e.preventDefault();
            let id = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({scrollTop: (top - header.outerHeight()) - 32}, 1000);
        });
    }

    postSlider();
    function postSlider() {
        let postSlider = $('.post-slider');
        if (postSlider.length){
            postSlider.each(function (id, elem) {
                let item = this.classList,

                    i;
                item.forEach(function (id, elem) {
                    if (id == 'post-slider' ){
                        i = id;
                    }
                });
                i;
                var swiper = new Swiper(`.${i} .swiper-container`, {
                    slidesPerView: 1,
                    spaceBetween: 32,
                    centeredSlides: true,
                    createElements: true,
                    touchMoveStopPropagation: true,
                    speed: 1000,
                    pagination: {
                        el: `.${i} .slider-pagination`,
                        clickable: true,
                        bulletClass: 'slider-pagination__item',
                        bulletActiveClass: 'active',
                    },
                    navigation: {
                        nextEl: `.${i} .slider-next`,
                        prevEl: `.${i} .slider-prev`,
                    },

                    slideActiveClass: 'active-slider',

                    roundLengths: true,
                    setWrapperSize: true,

                    breakpoints:{
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 32,
                        },
                    }
                });
            });
        }
    }

})(jQuery);
