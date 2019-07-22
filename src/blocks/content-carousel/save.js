/* eslint-disable camelcase */
const { InnerBlocks } = wp.editor;
export default ( { attributes } ) => {
	return (
		<div>
			<div className="swiper-carousel-container">
				<div className="swiper-wrapper">
					<InnerBlocks.Content />
				</div>
				<div className="swiper-pagination" />
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
			</div>
		</div>
	);
};
