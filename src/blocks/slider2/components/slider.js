/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
const { Button } = wp.components;
const { MediaUpload } = wp.editor;

// render one Slide
export const Slide = ( {
	image,
	title,
	content,
	alignContent,
	btnLabel,
	addSlideHandler,
	editSlideHandler,
	deleteSlideImageHandler,
	selectImageHandler,
	deleteSlideHandler,
} ) => {
	const styles = {
		backgroundImage: `url(${ image })`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: '50% 60%',
		height: '600px',
	};
	return (
		<MediaUpload
			onSelect={imageObject => {
				selectImageHandler( imageObject );
			}}
			type="image"
			value={image}
			render={( { open } ) => {
				return ! true ? null : (
					<div className="slide" style={styles}>
						<Button isDefault className="image-button" onClick={open}>
							Choose Image
						</Button>
						<Button
							isDefault
							className={'slide-edit-this-slide'}
							onClick={() => {
								editSlideHandler();
							}}
						>
							Edit This Slide
						</Button>
						<Button
							isDefault
							className={'slide-add-this-slide'}
							onClick={() => {
								addSlideHandler();
							}}
						>
							Add New Slide
						</Button>
						<Button
							isDefault
							className="remove-image"
							onClick={() => {
								deleteSlideImageHandler();
							}}
						>
							Delete Image
						</Button>
						<Button
							isDefault
							className="remove-slider"
							onClick={() => {
								deleteSlideHandler();
							}}
						>
							Delete Slide
						</Button>

						<h2
							className={'slide-title'}
							style={{
								justifyContent:
									alignContent === 'right' ? 'flex-end' : alignContent,
							}}
							data-alignContent={alignContent}
							dangerouslySetInnerHTML={{ __html: title }}
						>
							{/* {title} */}
						</h2>
						<p
							className={'slide-content'}
							style={{ textAlign: alignContent }}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
						<div
							className={'slide-btn-container'}
							style={{
								justifyContent:
									alignContent === 'right' ? 'flex-end' : alignContent,
							}}
						>
							<Button className={'slide-btn fl-button'} href={'####'}>
								{btnLabel}
							</Button>
						</div>
					</div>
				);
			}}
		/>
	);
};

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
