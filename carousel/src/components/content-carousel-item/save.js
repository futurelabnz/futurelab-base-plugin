/* eslint-disable camelcase */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
export default ( { attributes } ) => {
	return (
		<div {...useBlockProps.save({ className: "swiper-slide" })}>
			<div class="wp-block-futurelab-base-plugin-carousel__inner-container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};
