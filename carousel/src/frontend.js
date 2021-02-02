(function ($) {
  'use strict';
  $(document).ready(function () {

      // init top carousel
      // var swiperCarousels = $(".products-carousel-container");
      var swiperCarousels = $('.wp-block-futurelab-base-plugin-carousel');
      // check if swiperContainer div exist
      if (typeof swiperCarousels !== 'undefined' && swiperCarousels !== null) {
          window.swiperCarouselsInstances = [];
          $.each($('.wp-block-futurelab-base-plugin-carousel .swiper-container'), function () {
              var swiperCarouselsInstance = new Swiper($(this), {
                  slidesPerView: 1,
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

              window.swiperCarouselsInstances.push(swiperCarouselsInstance);
          });

      }
      // window.swiperGalleriesInstances[0].destroy();

  });

})(jQuery);
