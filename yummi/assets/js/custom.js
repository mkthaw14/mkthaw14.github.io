$(document).ready(function() {

    $(".category_slider").slick({
        rtl: false, // If RTL Make it true & .slick-slide{float:right;}
        autoplay: true,
        autoplaySpeed: 5000, //  Slide Delay
        speed: 800, // Transition Speed
        slidesToShow: 7, // Number Of Carousel
        slidesToScroll: 1, // Slide To Move 
        pauseOnHover: false,
        appendArrows: $(".category_area .arrow_container .arrows"), // Class For Arrows Buttons
        prevArrow: '<span class="slick_prev"></span>',
        nextArrow: '<span class="slick_next"></span>',
        easing: "linear",
        responsive: [{
                breakpoint: 801,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 641,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                }
            },
        ],
    })

    // menu fixed js code
    $(window).scroll(function() {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 50) {
            $('.main_menu').addClass('menu_fixed animated fadeInDown');
        } else {
            $('.main_menu').removeClass('menu_fixed animated fadeInDown');

        }
    });

});