import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

const blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
};

registerBlockType('futurelab-base-plugin/slider', {
    title: __('Slider', 'futurelab-base-plugin'),
    icon: 'wordpress',
    category: 'layout',
    example: {},
    edit() {
        return <div style={blockStyle}>Hello World, step 1 (from the editor).</div>;
    },
    save() {
        return (
            <div class='swiper-container'>
                <div class='swiper-wrapper'>
                    <div class='swiper-slide'>Slide 1</div>
                    <div class='swiper-slide'>Slide 2</div>
                    <div class='swiper-slide'>Slide 3</div>
                    <div class='swiper-slide'>Slide 4</div>
                    <div class='swiper-slide'>Slide 5</div>
                    <div class='swiper-slide'>Slide 6</div>
                    <div class='swiper-slide'>Slide 7</div>
                    <div class='swiper-slide'>Slide 8</div>
                    <div class='swiper-slide'>Slide 9</div>
                    <div class='swiper-slide'>Slide 10</div>
                </div>
                {/* <!-- Add Pagination --> */}
                <div class='swiper-pagination'></div>
                {/* <!-- Add Arrows --> */}
                <div class='swiper-button-next'></div>
                <div class='swiper-button-prev'></div>
            </div>
        );
    },
});
