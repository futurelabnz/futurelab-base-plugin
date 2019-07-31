/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// render Left Arrow
export const LeftArrow = ( { goToPrevSlide } ) => {
	return (
		<div className="backArrow arrow-custom" onClick={goToPrevSlide}>
			<span className="dashicons dashicons-arrow-left-alt" />
		</div>
	);
};

// render Right Arrow
export const RightArrow = ( { goToNextSlide } ) => {
	return (
		<div className="nextArrow arrow-custom" onClick={goToNextSlide}>
			<span className="dashicons dashicons-arrow-right-alt" />
		</div>
	);
};

