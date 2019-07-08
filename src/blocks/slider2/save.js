/* eslint-disable camelcase */

import { scrolldownArrow } from './icons';

export default ( { attributes, setAttributes } ) => {
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
