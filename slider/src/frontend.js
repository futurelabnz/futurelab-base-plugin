(function ($) {
  'use strict';
  $(document).ready(function () {

      // init top slider
      // var swiperSliders = $(".products-slider-container");
      var swiperSliders = $('.wp-block-futurelab-base-plugin-slider');
      // check if swiperContainer div exist
      if (typeof swiperSliders !== 'undefined' && swiperSliders !== null) {
          window.swiperSlidersInstances = [];
          $.each($('.wp-block-futurelab-base-plugin-slider .swiper-container'), function () {
              var swiperSlidersInstance = new Swiper($(this), {
                  slideClass: 'wp-block-cover',
                  speed: 800,
                  spaceBetween: 0,
                  autoplay: {
                      delay: 2000,
                      disableOnInteraction: true,
                  },
                  loop: true,
                  pagination: {
                      el: $(this).children('.swiper-pagination'),
                      clickable: true,
                  },
                  navigation: {
                    nextEl: $(this).children(".swiper-button-next"),
                    prevEl: $(this).children(".swiper-button-prev")
                  },
                  a11y: {
                      prevSlideMessage: 'Prev Slide',
                      nextSlideMessage: 'Next Slide',
                  },
                  observer: true,
                  observeParents: true,
              });

              window.swiperSlidersInstances.push(swiperSlidersInstance);
          });

          $.each($('.wp-block-futurelab-base-plugin-slider .swiper-slide'), function (index, value) {
              if ($(this).hasClass('swiper-slide-duplicate')) {
                  $(this).attr('aria-hidden', 'true');
              }
          });
      }
      // window.swiperGalleriesInstances[0].destroy();

  });
})(jQuery);
