/* eslint-disable camelcase */

import { scrolldownArrow } from './icons';

const attributes = {
	// slides array useful to loop and generate slide
	align: {
		type: 'string',
		default: 'full',
	},
	slides: {
		type: 'Array',
		default: [
			{
				image: '',
				title: 'please enter title',
				content: 'please enter content',
				btnLabel: 'button label',
				btnUrl: '',
				embedUrl: '',
			},
		],
	},
	// the swiper array from page(including HTML types)
	swiperSlide: {
		type: 'Array',
		selector: '.swiper-wrapper',
		source: 'children',
	},
	title: {
		type: 'Array',
		selector: '.slide-title',
		source: 'text',
	},
	currentIndex: {
		type: 'Number',
		default: 0,
	},
	translateValue: {
		type: 'Number',
		default: 0,
	},
	slidesSelector: {
		type: 'String',
		source: 'attribute',
		attribute: 'data-slides',
		selector: '.swiper-wrapper',
	},
};
const sliderSave = ( { attributes, setAttributes } ) => {
	const { slides = [] } = attributes;
	console.log( 'slides Save', slides );
	console.log( 'JSON.stringify( slides )', JSON.stringify( slides ) );

	// check if the url has http:'' protocal at first
	function addhttp( url ) {
		let newUrl = '';
		if ( ! url.match( /^(http|https)/ ) ) {
			newUrl = `http://${ url }`;
			return newUrl;
		}

		return url;
	}

	return (
		<div>
			<div className="swiper-container">
				<div className="swiper-wrapper" data-slides={JSON.stringify( slides )}>
					{slides.map( ( slide, i ) => {
						const { image, title, content, btnLabel, btnUrl, embedUrl } = slide;
						const styles = {
							backgroundImage: `url(${ image })`,
							// backgroundSize: 'cover',
							// backgroundRepeat: 'no-repeat',
							// backgroundPosition: '50% 60%',
							// height: '600px',
						};
						return (
							<div key={i} className="swiper-slide grid-x" style={styles}>
								<div
									style={{
										...styles,
										height: '300px',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundPosition: '50% 60%',
									}}
									className="medium-12 small-12 hide-for-large"
								/>
								<div className="overlay-slider medium-12 small-12">
									<div className="slider-container alignwide grid-x">
										<div className="slide-content-container large-6 medium-12 small-12">
											<h2
												className={'slide-title'}
												dangerouslySetInnerHTML={{ __html: title }}
											>
												{/* {title} */}
											</h2>
											<p
												className={'slide-content'}
												dangerouslySetInnerHTML={{ __html: content }}
											/>
											<div className={'slide-btn-container'}>
												<a
													className={'slide-btn fl-button'}
													href={addhttp( `${ btnUrl }` )}
												>
													{btnLabel}
												</a>
											</div>
										</div>

										<div
											className={
												'slide-video-container large-6 medium-12 small-12'
											}
										>
											<iframe
												title="embedVideo"
												className="slide-video"
												src={
													embedUrl ?
														addhttp( `${ embedUrl }` ) :
														'https://www.youtube.com/embed/eNpZCFbZeUE'
												}
												style={embedUrl ? '' : 'display: none'}
												frameBorder="0"
												allow="autoplay; encrypted-media"
											/>
										</div>
									</div>
								</div>
							</div>
						);
					} )}
				</div>
				<div className="swiper-pagination" />
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
				<div className="scrolldown-arrow arrow-custom">
					<span style={{ position: 'absolute' }}>{scrolldownArrow}</span>
				</div>
			</div>
		</div>
	);
};

// 03/09/2019 To add inspector controll for slider autoSlide and slide speed and loop...
const attributesFixDisplayNoneVideo = {
	// slides array useful to loop and generate slide
	align: {
		type: 'string',
		default: 'full',
	},
	slides: {
		type: 'Array',
		default: [
			{
				image: '',
				title: 'please enter title',
				content: 'please enter content',
				btnLabel: 'button label',
				btnUrl: '',
				embedUrl: '',
			},
		],
	},
	// the swiper array from page(including HTML types)
	swiperSlide: {
		type: 'Array',
		selector: '.swiper-wrapper',
		source: 'children',
	},
	title: {
		type: 'Array',
		selector: '.slide-title',
		source: 'text',
	},
	currentIndex: {
		type: 'Number',
		default: 0,
	},
	translateValue: {
		type: 'Number',
		default: 0,
	},
	slidesSelector: {
		type: 'String',
		source: 'attribute',
		attribute: 'data-slides',
		selector: '.swiper-wrapper',
	},
};
const sliderSaveFixDisplayNoneVideo = ( { attributes, setAttributes } ) => {
	const { slides = [] } = attributes;

	// check if the url has http:'' protocal at first
	function addhttp( url ) {
		let newUrl = '';
		if ( ! url.match( /^(http|https)/ ) ) {
			newUrl = `http://${ url }`;
			return newUrl;
		}

		return url;
	}

	// console.log( 'slides in save', slides );

	return (
		<div>
			<div className="swiper-container">
				<div className="swiper-wrapper" data-slides={JSON.stringify( slides )}>
					{slides.map( ( slide, i ) => {
						const { image, title, content, btnLabel, btnUrl, embedUrl } = slide;
						const styles = {
							backgroundImage: `url(${ image })`,
						};
						return (
							<div key={i} className="swiper-slide grid-x" style={styles}>
								<div
									style={styles}
									className="medium-12 small-12 mobile-slider hide-for-large"
								/>
								<div className="overlay-slider medium-12 small-12">
									<div className="slider-container alignwide grid-x">
										<div className="slide-content-container large-6 medium-12 small-12">
											<h2
												className={'slide-title'}
												dangerouslySetInnerHTML={{ __html: title }}
											>
												{/* {title} */}
											</h2>
											<p
												className={'slide-content'}
												dangerouslySetInnerHTML={{ __html: content }}
											/>
											<div className={'slide-btn-container'}>
												<a
													className={'slide-btn fl-button'}
													href={addhttp( `${ btnUrl }` )}
												>
													{btnLabel}
												</a>
											</div>
										</div>

										<div
											className={
												'slide-video-container large-6 medium-12 small-12'
											}
										>
											{embedUrl && (
												<iframe
													title="embedVideo"
													className="slide-video"
													src={embedUrl ? addhttp( `${ embedUrl }` ) : ''}
													// style={embedUrl ? '' : 'display: none'}
													frameBorder="0"
													allow="autoplay; encrypted-media"
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						);
					} )}
				</div>
				<div className="swiper-pagination" />
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
				<div className="scrolldown-arrow arrow-custom">
					<span style={{ position: 'absolute' }}>{scrolldownArrow}</span>
				</div>
			</div>
		</div>
	);
};

// Build deprecated list
const deprecated = [
	{
		attributes: attributes,
		save: sliderSave,
	},
	{
		attributes: attributesFixDisplayNoneVideo,
		save: sliderSaveFixDisplayNoneVideo,
	},
];

export default deprecated;
