/* eslint-disable camelcase */
const { InnerBlocks } = wp.editor;
export default ( { attributes } ) => {
	const {
		autoSlide,
		autoplaySpeed,
		infiniteLoop,
		isShowPagination,
	} = attributes;
	return (
		<div>
			<div className="swiper-carousel-container">
				<div
					className="swiper-wrapper"
					data-isslide={JSON.stringify( autoSlide )}
					data-isshowpagination={JSON.stringify( isShowPagination )}
					data-autoplayspeed={JSON.stringify( autoplaySpeed )}
					data-infiniteloop={JSON.stringify( infiniteLoop )}
				>
					<InnerBlocks.Content />
				</div>
				<div className="swiper-pagination" />
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
			</div>
		</div>
	);
};
