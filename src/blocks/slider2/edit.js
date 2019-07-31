/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */

const { Button, Modal, TextControl } = wp.components;
const { RichText, URLInput, MediaUpload } = wp.editor;
const { Component } = wp.element;

import { Slide, LeftArrow, RightArrow } from './components/slider';
import { scrolldownArrow } from './icons';

export default class extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.state = {
			slidesArray: [
				{
					image: '',
					title: 'please enter title',
					content: 'please enter content',
					btnLabel: 'button label',
					btnUrl: '',
					embedUrl: '',
				},
			],
		};
	}
	// component finish loading
	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		const { swiperSlide, embedUrl, slidesSelector, slides } = attributes;

		// const newSlidesArray = JSON.parse( slidesSelector ) || [];
		let newSlidesArray = [];
		if ( slidesSelector ) {
			newSlidesArray = JSON.parse( slidesSelector );
		}

		// first time add slider block, do not need to store the data on page to state and attribute
		if ( newSlidesArray.length > 0 ) {
			this.setState( { slidesArray: newSlidesArray } );
			// TODO: feels not right to setAttributes here
			setAttributes( { slides: [ ...newSlidesArray ] } );
		}
	}

	// go to previous slide event handler
	goToPrevSlide = () => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex, translateValue } = attributes;
		if ( currentIndex === 0 ) {
			return;
		}

		setAttributes( {
			currentIndex: currentIndex - 1,
			translateValue: translateValue + this.slideWidth(),
		} );
	};

	// go to next slide event handler
	goToNextSlide = () => {
		const { attributes, setAttributes } = this.props;
		const { slides = [], currentIndex, translateValue } = attributes;
		// Exiting the method early if we are at the end of the images array.
		// We also want to reset currentIndex and translateValue, so we return
		// to the first image in the array.
		if ( currentIndex === slides.length - 1 ) {
			return setAttributes( {
				currentIndex: 0,
				translateValue: 0,
			} );
		}

		// This will not run if we met the if condition above
		setAttributes( {
			currentIndex: currentIndex + 1,
			translateValue: translateValue + -this.slideWidth(),
		} );
	};

	// get slide width from dom
	slideWidth = () => {
		return document.querySelector( '.slide' ).clientWidth;
	};

	// add new slide button event handler
	addSlideHandler = () => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex, translateValue } = attributes;
		const { slidesArray } = this.state;
		const newSlidesArray = slidesArray;
		const slideData = {
			image: '',
			title: 'please enter title',
			content: 'please enter content',
			btnLabel: 'button label',
			btnUrl: '',
			embedUrl: '',
		};
		newSlidesArray.splice( currentIndex + 1, 0, slideData );
		this.setState( { slidesArray: newSlidesArray } );
		setAttributes( {
			currentIndex: currentIndex + 1,
			translateValue: translateValue + -this.slideWidth(),
			slides: [ ...newSlidesArray ],
		} );
	};

	// edit slide event handler
	editSlideHandler = () => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex } = attributes;
		const { slidesArray } = this.state;

		// if user click edit this slide right after create a slider
		let newSlidesArray = [];

		newSlidesArray = slidesArray;
		// edit components own state
		this.setState( { slidesArray: newSlidesArray } );
		setAttributes( { isEditModalOpen: true } );
	};

	// remove slide image event handler
	deleteSlideImageHandler = () => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex } = attributes;
		const { slidesArray } = this.state;
		// setAttributes( { leftImage: '' } );
		const newSlidesArray = slidesArray;
		newSlidesArray.map( ( item, index ) => {
			if ( index === currentIndex ) {
				item.image = '';
			}
		} );
		// edit components own state
		this.setState( { slidesArray: newSlidesArray } );
		// pass the data to attributes
		setAttributes( { slides: [ ...newSlidesArray ] } );
	};

	// remove slider event handler
	deleteSlideHandler = () => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex, translateValue } = attributes;
		const { slidesArray } = this.state;
		// setAttributes( { leftImage: '' } );
		const newSlidesArray = slidesArray;

		// delete currnet slide
		newSlidesArray.splice( currentIndex, 1 );
		// edit components own state
		this.setState( { slidesArray: newSlidesArray } );
		// pass the data to attributes
		setAttributes( { slides: [ ...newSlidesArray ] } );
	};

	// select Image handler for change Image and Add new Image
	selectImageHandler = imageObject => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex } = attributes;
		const { slidesArray } = this.state;

		// if it is the first time add block and select image
		let newSlidesArray = [];

		newSlidesArray = slidesArray;

		newSlidesArray.map( ( item, index ) => {
			if ( index === currentIndex ) {
				item.image = imageObject.sizes.full.url;
			}
		} );
		// edit components own state
		this.setState( { slidesArray: newSlidesArray } );
		// pass the data to attributes
		setAttributes( { slides: [ ...newSlidesArray ] } );
	};

	addhttp( url ) {
		let newUrl = '';
		if ( ! url.match( /^(http|https)/ ) ) {
			newUrl = `http://${ url }`;
			return newUrl;
		}

		return url;
	}

	render() {
		const { attributes, setAttributes, className } = this.props;
		const {
			slides = [],
			currentIndex,
			translateValue,
			isEditModalOpen,
			btnUrl,
			embedUrl,
		} = attributes;
		const { slidesArray } = this.state;
		return (
			<div className={className}>
				<div className="slider">
					<div
						className="slider-wrapper"
						style={{
							transform: `translateX(${ translateValue }px)`,
							transition: 'transform ease-out 0.45s',
						}}
					>
						{slides.map( ( slide, i ) => {
							const { image, title, content, btnLabel } = slide;
							return (
								<MediaUpload
									onSelect={imageObject => {
										this.selectImageHandler( imageObject );
									}}
									type="image"
									value={image}
									render={( { open } ) => {
										return ! true ? null : (
											<div
												className="slide"
												style={{
													backgroundImage: `url(${ image })`,
												}}
											>
												<Button
													isDefault
													className="image-button"
													onClick={open}
												>
													Choose Image
												</Button>
												<Button
													isDefault
													className={'slide-edit-this-slide'}
													onClick={() => {
														this.editSlideHandler();
													}}
												>
													Edit This Slide
												</Button>
												<Button
													isDefault
													className={'slide-add-this-slide'}
													onClick={() => {
														this.addSlideHandler();
													}}
												>
													Add New Slide
												</Button>
												<Button
													isDefault
													className="remove-image"
													onClick={() => {
														this.deleteSlideImageHandler();
													}}
												>
													Delete Image
												</Button>
												<Button
													isDefault
													className="remove-slider"
													onClick={() => {
														this.deleteSlideHandler();
													}}
												>
													Delete Slide
												</Button>

												<div className="grid-x">
													<div className="large-6 medium-12 small-12">
														<RichText
															className="slider-richtext slide-title"
															placeholder="TITLE"
															onChange={value => {
																let newSlidesArray = [];
																newSlidesArray = slidesArray;
																newSlidesArray.map( ( item, index ) => {
																	if ( index === currentIndex ) {
																		item.title = value;
																	}
																} );
																// edit components own state
																this.setState( { slidesArray: slidesArray } );
																// pass the data to attributes
																setAttributes( { slides: [ ...newSlidesArray ] } );
															}}
															value={
																slidesArray[ currentIndex ] ?
																	slidesArray[ currentIndex ].title :
																	''
															}
														/>
														<RichText
															className="slider-richtext slide-content"
															placeholder="content"
															onChange={value => {
																let newSlidesArray = [];
																newSlidesArray = slidesArray;
																newSlidesArray.map( ( item, index ) => {
																	if ( index === currentIndex ) {
																		item.content = value;
																	}
																} );

																this.setState( { slidesArray: newSlidesArray } );
																setAttributes( { slides: [ ...newSlidesArray ] } );
															}}
															value={
																slidesArray[ currentIndex ] ?
																	slidesArray[ currentIndex ].content :
																	''
															}
														/>
														<div className={'slide-btn-container'}>
															<Button
																className={'slide-btn fl-button'}
																href={'####'}
															>
																{/* {btnLabel} */}
																<RichText
																	className="slider-richtext"
																	placeholder="btnLabel"
																	onChange={value => {
																		let newSlidesArray = [];
																		newSlidesArray = slidesArray;
																		newSlidesArray.map( ( item, index ) => {
																			if ( index === currentIndex ) {
																				item.btnLabel = value;
																			}
																		} );
																		this.setState( {
																			slidesArray: newSlidesArray,
																		} );
																		setAttributes( {
																			slides: [ ...newSlidesArray ],
																		} );
																	}}
																	value={
																		slidesArray[ currentIndex ] ?
																			slidesArray[ currentIndex ].btnLabel :
																			''
																	}
																/>
															</Button>
														</div>
													</div>
													<div className="large-6 medium-12 small-12">
														{slidesArray[ currentIndex ] && (
															<iframe
																title="embedVideo"
																className="slide-video"
																src={
																	slidesArray[ currentIndex ].embedUrl ?
																		this.addhttp(
																			`${ slidesArray[ currentIndex ].embedUrl }`
																		  ) :
																		''
																}
																frameBorder="0"
																allow="autoplay; encrypted-media"
															/>
														)}
													</div>
												</div>
											</div>
										);
									}}
								/>
							);
						} )}
					</div>
					<LeftArrow goToPrevSlide={this.goToPrevSlide} />
					<RightArrow goToNextSlide={this.goToNextSlide} />
				</div>
				{/* Edit Modal */}
				<div>
					{isEditModalOpen && (
						<Modal
							title="Change this Slide"
							onRequestClose={() => setAttributes( { isEditModalOpen: false } )}
							className="slider-modal"
							shouldCloseOnClickOutside={false}
						>
							<p style={{ fontSize: '24px', fontWeight: 'bold' }}>
								Please enter button url
							</p>
							<TextControl
								className="slider-richtext"
								placeholder="btnURL"
								onChange={value => {
									const newSlidesArray = slidesArray;
									newSlidesArray.map( ( item, index ) => {
										if ( index === currentIndex ) {
											item.btnUrl = value;
										}
									} );
									this.setState( { slidesArray: slidesArray } );
									setAttributes( { slides: slidesArray } );
								}}
								value={slidesArray[ currentIndex ].btnUrl}
							/>
							<p style={{ fontSize: '24px', fontWeight: 'bold' }}>
								Please enter video url
							</p>
							<TextControl
								className="slider-richtext"
								placeholder="Video"
								onChange={value => {
									const newSlidesArray = slidesArray;
									newSlidesArray.map( ( item, index ) => {
										if ( index === currentIndex ) {
											item.embedUrl = value;
										}
									} );
									this.setState( { slidesArray: slidesArray } );
									setAttributes( { slides: slidesArray } );
								}}
								value={slidesArray[ currentIndex ].embedUrl}
							/>
							<Button
								isDefault
								onClick={() => setAttributes( { isEditModalOpen: false } )}
							>
								Close
							</Button>
						</Modal>
					)}
				</div>
			</div>
		);
	}
}
