/* eslint-disable camelcase */
const { InnerBlocks } = wp.editor;
export default ( { attributes } ) => {
	return (
		<div className="swiper-slide">
			<InnerBlocks.Content />
		</div>
	);
};
