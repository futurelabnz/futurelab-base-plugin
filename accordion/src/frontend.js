(function ($) {
    'use strict';
    $(document).ready(function () {
        var flBlockAccordionEls = $('.wp-block-futurelab-base-plugin-accordion');

        if (flBlockAccordionEls.length) {
            $.each(flBlockAccordionEls, function () {
                $(this)
                    .children('.fl-accordion-title')
                    .on('click', function () {
                        $(this).toggleClass('active');
                        $(this).siblings('.fl-accordion-panel').toggleClass('active');
                    });
            });
        }
    });
})(jQuery);
