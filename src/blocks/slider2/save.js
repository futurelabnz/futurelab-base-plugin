/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable camelcase */

import { scrolldownArrow } from './icons';

export default ({ attributes, setAttributes }) => {
	const {
		slides = [],
		autoSlide,
		autoplaySpeed,
		infiniteLoop,
		isshowpagination,
	} = attributes;

	// check if the url has http:'' protocal at first
	function addhttp(url) {
		let newUrl = '';
		if (!url.match(/^(http|https)/)) {
			newUrl = `http://${url}`;
			return newUrl;
		}

		return url;
	}

	return (
		<div>
			<div className="swiper-container">
				<div
					className="swiper-wrapper"
					data-slides={JSON.stringify(slides)}
					data-isslide={JSON.stringify(autoSlide)}
					data-isshowpagination={JSON.stringify(isshowpagination)}
					data-autoplayspeed={JSON.stringify(autoplaySpeed)}
					data-infiniteloop={JSON.stringify(infiniteLoop)}
				>
					{slides.map((slide, i) => {
						const { image, title, content, btnLabel, btnUrl, embedUrl } = slide;
						const styles = {
							backgroundImage: `url(${image})`,
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
												// add aria hidden to fix narrator read first slide two times when infinity loop.
												// aria-hidden={i === 0 ? 'false' : 'true'}
											>
												{/* {title} */}
											</h2>
											<p
												className={'slide-content'}
												dangerouslySetInnerHTML={{ __html: content }}
												// add aria hidden to fix narrator read first slide two times when infinity loop.
												// aria-hidden={i === 0 ? 'false' : 'true'}
											/>
											<div className={'slide-btn-container'}>
												<a
													className={'slide-btn fl-button'}
													href={addhttp(`${btnUrl}`)}
													// add aria hidden to fix narrator read first slide two times when infinity loop.
													// aria-hidden={i === 0 ? 'false' : 'true'}
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
													src={embedUrl ? addhttp(`${embedUrl}`) : ''}
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
					})}
				</div>
				<div className="swiper-pagination" />
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
				<div className="scrolldown-arrow arrow-custom">
					<span style={{ position: 'absolute' }}>{scrolldownArrow}</span>
				</div>
			</div>
		</div >
	);
};
