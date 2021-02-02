/* eslint-disable camelcase */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
export default ( { attributes } ) => {
	return (
		<div className="swiper-slide">
			<InnerBlocks.Content />
		</div>
	);
};
