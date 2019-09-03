/* eslint-disable camelcase */
const { InnerBlocks } = wp.editor;

const attributes = {
	//Attributes
	// slides array useful to loop and generate slide
	align: {
		type: 'string',
		default: 'full',
	},
	currentSlide: {
		type: 'Number',
		default: 0,
	},
};

const save = ( { attributes } ) => {
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

// Build deprecated list
const deprecated = [
	{
		attributes: attributes,
		save: save,
	},
];

export default deprecated;
