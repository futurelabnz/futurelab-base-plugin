/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */

const { Button, Modal, TextControl } = wp.components;
const { RichText, URLInput } = wp.editor;
const { Component } = wp.element;

import { Slide, LeftArrow, RightArrow } from './components/slider';
import { scrolldownArrow } from './icons';

export default class extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
		this.state = {
			slidesArray: [],
		};
	}
	// component finish loading
	componentDidMount() {
		const { attributes, setAttributes } = this.props;
		const { swiperSlide, embedUrl, slidesSelector, slides } = attributes;

		console.log( 'slides', slides );

		console.log( 'slidesSelector', slidesSelector );
		// console.log( ' JSON.parse(slidesSelector)', JSON.parse( slidesSelector ) );

		console.log( 'embedUrl', embedUrl );

		// const newSlidesArray = JSON.parse( slidesSelector ) || [];
		let newSlidesArray = [];
		if ( slidesSelector ) {
			newSlidesArray = JSON.parse( slidesSelector );
		}

		// first time add slider block, do not need to store the data on page to state and attribute
		if ( newSlidesArray.length > 0 ) {
			console.log( 'slides', newSlidesArray );
			this.setState( { slidesArray: newSlidesArray } );
			// TODO: feels not right to setAttributes here
			setAttributes( { slides: newSlidesArray } );
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
		};
		newSlidesArray.splice( currentIndex + 1, 0, slideData );
		this.setState( { slidesArray: newSlidesArray } );
		setAttributes( {
			currentIndex: currentIndex + 1,
			translateValue: translateValue + -this.slideWidth(),
			slides: newSlidesArray,
		} );
	};

	// edit slide event handler
	editSlideHandler = () => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex } = attributes;
		const { slidesArray } = this.state;

		// if it is the first time add block and select image
		let newSlidesArray = [];
		if ( slidesArray.length === 0 ) {
			const slideData = {
				image: '',
				title: 'please enter title',
				content: 'please enter content',
				btnLabel: 'button label',
				btnUrl: '',
			};
			newSlidesArray.push( slideData );
		} else {
			newSlidesArray = slidesArray;
		}
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
		setAttributes( { slides: newSlidesArray } );
	};

	// remove slider event handler
	deleteSlideHandler = () => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex, translateValue } = attributes;
		const { slidesArray } = this.state;
		// setAttributes( { leftImage: '' } );
		const newSlidesArray = slidesArray;
		console.log( 'currentIndex', currentIndex );

		// delete currnet slide
		newSlidesArray.splice( currentIndex, 1 );
		// edit components own state
		this.setState( { slidesArray: newSlidesArray } );
		// pass the data to attributes
		setAttributes( { slides: newSlidesArray } );
	};

	// select Image handler for change Image and Add new Image
	selectImageHandler = imageObject => {
		const { attributes, setAttributes } = this.props;
		const { currentIndex } = attributes;
		const { slidesArray } = this.state;

		// if it is the first time add block and select image
		let newSlidesArray = [];
		if ( slidesArray.length === 0 ) {
			const slideData = {
				image: '',
				title: 'please enter title',
				content: 'please enter content',
				btnLabel: 'button label',
				btnUrl: '',
			};
			newSlidesArray.push( slideData );
		} else {
			newSlidesArray = slidesArray;
		}
		newSlidesArray.map( ( item, index ) => {
			if ( index === currentIndex ) {
				item.image = imageObject.sizes.full.url;
			}
		} );
		// edit components own state
		this.setState( { slidesArray: newSlidesArray } );
		// pass the data to attributes
		setAttributes( { slides: newSlidesArray } );
	};

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
								<Slide
									key={i}
									// slideIndex={i}
									image={image}
									title={title}
									content={content}
									btnLabel={btnLabel}
									embedUrl={embedUrl}
									addSlideHandler={this.addSlideHandler}
									editSlideHandler={this.editSlideHandler}
									deleteSlideImageHandler={this.deleteSlideImageHandler}
									selectImageHandler={this.selectImageHandler}
									deleteSlideHandler={this.deleteSlideHandler}
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
								Please enter slide title
							</p>
							<RichText
								className="slider-richtext"
								placeholder="TITLE"
								onChange={value => {
									const newSlidesArray = slidesArray;
									newSlidesArray.map( ( item, index ) => {
										if ( index === currentIndex ) {
											item.title = value;
										}
									} );
									// edit components own state
									this.setState( { slidesArray: slidesArray } );
									// pass the data to attributes
									setAttributes( { slides: slidesArray } );
								}}
								value={slidesArray[ currentIndex ].title}
							/>
							<p style={{ fontSize: '24px', fontWeight: 'bold' }}>
								Please enter slide content
							</p>
							<RichText
								className="slider-richtext"
								placeholder="content"
								onChange={value => {
									const newSlidesArray = slidesArray;
									newSlidesArray.map( ( item, index ) => {
										if ( index === currentIndex ) {
											item.content = value;
										}
									} );
									this.setState( { slidesArray: slidesArray } );
									setAttributes( { slides: slidesArray } );
								}}
								value={slidesArray[ currentIndex ].content}
							/>
							<p style={{ fontSize: '24px', fontWeight: 'bold' }}>
								Please enter button label
							</p>
							<RichText
								className="slider-richtext"
								placeholder="btnLabel"
								onChange={value => {
									const newSlidesArray = slidesArray;
									newSlidesArray.map( ( item, index ) => {
										if ( index === currentIndex ) {
											item.btnLabel = value;
										}
									} );
									this.setState( { slidesArray: slidesArray } );
									setAttributes( { slides: slidesArray } );
								}}
								value={slidesArray[ currentIndex ].btnLabel}
							/>
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
