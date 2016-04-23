/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
;(function ($) {
    "use strict";

    $.fn.exists = function (callback) {
        var args = [].slice.call(arguments, 1);
        if (this.length) {
            callback.call(this, args);
        }
        return this;
    };

    var navbar = {
        init: function (settings) {
            navbar.config = {
                mainNavWrapper: $('.site-header .main-navigation'),
                userLogin: $('.site-header  .user-login')
            };
            $.extend(navbar.config, settings);
            navbar.baseLevelMenuHover();
            navbar.subMenuHover();
            //navbar.sticky();
            navbar.mobileNav();
        },
        baseLevelMenuHover: function () {
            $.fn.menuWhichSide = function () {
                this.exists(function () {
                    var offset = this.offset();
                    var posX = offset.left - $(window).scrollLeft() + 250;
                    var posXToRight = $(window).width() - posX;
                    if (posXToRight < 0) {
                        this.addClass('pull-inverse')
                    }
                });
                return this;
            };
            navbar.config.mainNavWrapper.find('ul').children('li').on({
                mouseenter: function (e) {
                    $(this).children('ul')
                        .css({display: "block"})
                        .menuWhichSide()
                        .stop()
                        .animate(
                            {
                                opacity: 1,
                                'margin-top': 0
                            },
                            {
                                duration: 300
                            }
                        );
                },
                mouseleave: function (e) {
                    $(this).find('ul').first()
                        .stop()
                        .animate(
                            {
                                opacity: 0,
                                'margin-top': -15
                            },
                            {
                                duration: 300,
                                complete: function () {
                                    $(this).css({display: "none"});
                                }
                            }
                        );
                }
            });
        },
        subMenuHover: function () {
            navbar.config.mainNavWrapper.children('ul').children('li').each(function () {
                $(this).find('ul').first().find('li').on({
                    mouseenter: function (e) {
                        $(this).find('ul').first()
                            .css({display: "block"})
                            .stop()
                            .animate(
                                {
                                    opacity: 1
                                },
                                {
                                    duration: 300
                                }
                            );
                    },
                    mouseleave: function (e) {
                        $(this).find('ul').first()
                            .stop()
                            .animate(
                                {
                                    opacity: 0
                                },
                                {
                                    duration: 300,
                                    complete: function () {
                                        $(this).css({display: "none"});
                                    }
                                }
                            );
                    }
                })
            });
        },
        sticky: function () {
            $(".sp-header").sticky({
                'wrapperClassName': 'sp-header-wrapper'
            });
        },
        mobileNav: function () {
            $('.sp-header .mobile-nav-toggle').on('click', function (e) {
                if ($('#sp-main-nav').css('display') != 'block') {
                    $(this).addClass('is-open');
                    $('#sp-main-nav').slideDown(500);
                } else {
                    $(this).removeClass('is-open');
                    $('#sp-main-nav').slideUp(500);
                }
                e.stopPropagation();
            });
        },
    };

    var backToTop = (function () {
        var init = function () {
            // Scroll (in pixels) after which the "To Top" link is shown
            var offset = 300,
            //Scroll (in pixels) after which the "back to top" link opacity is reduced
                offset_opacity = 1200,
            //Get the "To Top" link
                $back_to_top = $('#back-to-top');

            //Visible or not "To Top" link
            $(window).scroll(function () {
                if ($(this).scrollTop() > offset) {
                    $back_to_top
                        .css({display: "block"})
                        .stop()
                        .animate(
                            {
                                opacity: 0.5,
                            },
                            {
                                duration: 100,
                                easing: "easeOutExpo"
                            }
                        );
                } else {
                    $back_to_top
                        .stop()
                        .animate(
                            {
                                opacity: 0,
                            },
                            {
                                duration: 100,
                                easing: "easeOutExpo",
                                complete: function () {
                                    $(this).css({display: "none"});
                                }
                            }
                        );
                }
                if ($(this).scrollTop() > offset_opacity) {
                    $back_to_top.addClass('top-fade-out');
                }
            });

            //Smoothy scroll to top
            $back_to_top.on('click', function (event) {
                $("html, body").animate({scrollTop: 0}, 1000, "easeInOutExpo");
                event.preventDefault();
            });
        };
        return {
            init: init
        }
    })();

    var slider = (function () {
        var init = function () {
            $('.sp-slider.sp-hero-slider').flexslider({
                namespace: "flex-",
                selector: ".slides > li",
                animation: "fade", //"fade" or "slide"
                slideshow: true,
                easing: "easeInOutExpo", // Easing
                useCSS: true, // Use css animation
                direction: 'horizontal', // horizontal, vertical
                controlNav: false, // Pagination
                directionNav: false, // Next, prev
                animationSpeed: 1000,
                slideshowSpeed: 7000,
                smoothHeight: false,
                prevText: '<i class ="fa fa-angle-left"></i>',
                nextText: '<i class ="fa fa-angle-right"></i>'
            });

            $('.sp-slider.sp-statistic-slider').flexslider({
                namespace: "flex-",
                selector: ".slides > li",
                animation: "fade", //"fade" or "slide"
                slideshow: true,
                easing: "linear", // Easing
                useCSS: true, // Use css animation
                direction: 'horizontal', // horizontal, vertical
                controlNav: true, // Pagination
                directionNav: false, // Next, prev
                animationSpeed: 1000,
                slideshowSpeed: 4000,
                smoothHeight: false,
                prevText: '<i class ="fa fa-angle-left"></i>',
                nextText: '<i class ="fa fa-angle-right"></i>'
            });
        };
        return {
            init: init
        }
    })();

    var map = (function () {
        var init = function () {
            google.maps.event.addDomListener(window, 'load', function() {
                var map_canvas = document.getElementById('sp-map'),
                    myLatlng = new google.maps.LatLng(21.003014, 105.820133),
                    bwStyle= [{
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
                    }, {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [{"color": "#dedede"}, {"lightness": 21}]
                    }, {
                        "elementType": "labels.text.stroke",
                        "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
                    }, {
                        "elementType": "labels.text.fill",
                        "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
                    }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
                    }],
                    map_options = {
                        center: myLatlng,
                        zoom: 14,
                        mapTypeId: 'roadmap',
                        disableDefaultUI: true,
                        scrollwheel: false,
                        styles: bwStyle // Black-White map
                    };
                // Init Map
                var map = new google.maps.Map(map_canvas, map_options);
            })
        };
        return {
            init: init
        }
    })();

    var formValidate = (function () {
        var init = function () {
            $.validator.addMethod("valueNotEquals", function(value, element, arg){
                return arg != value;
            }, "Value must not equal arg.");

            $('.login-form').validate();
            $('.sp-register-form').validate({
                rules: {
                    'select-4' :{
                        required: function(elm) {
                            return (elm.options[elm.options.selectedIndex].value == "-1");
                        }
                    },
                    'select-7' :{
                        required: function(elm) {
                            return (elm.options[elm.options.selectedIndex].value == "-1");
                        }
                    }
                },
                messages: {
                    'select-4': {
                        required: "Bạn phải chọn loại hình cơ sở"
                    },
                    'select-7': {
                        required: "Bạn phải chọn loại hình cơ sở"
                    }
                }
            });
        };
        return {
            init: init
        }
    })();

    var other = (function () {
        var init = function () {

            // Match Height
            if (jQuery().matchHeight) {
                $('.sp-features .entry').matchHeight({
                    byRow: true,
                    property: 'height',
                    target: null,
                    remove: false
                });
            }

            $('a.login').on('click', function(){
                $('.login-form').find('.username').focus();
            });

        };
        return {
            init: init
        }
    })();

    // DOM READY
    $(document).ready(function () {
        navbar.init();
        slider.init();
        backToTop.init();
        map.init();
        formValidate.init();
        other.init();
    });

    $(window).on('load', function () {
    })

})(jQuery); // EOF