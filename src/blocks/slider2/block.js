/*
 * @Author: Hank
 * @Date: 2019-05-10 09:08:46
 * @Last Modified by: Hank
 * @Last Modified time: 2019-06-19 11:53:38
 */

// TODO: Fix the content width on backend editor, the content can go out side of div...

//  Import CSS.
import './style.scss';
import './editor.scss';
import { Slide, LeftArrow, RightArrow } from './components/slider';
import { scrolldownArrow } from './icons';
const { Button, Modal, TextControl } = wp.components;
const { RichText, URLInput } = wp.editor;
const { Component } = wp.element;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( 'futurelab/block-fl-block-slider2', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'fl slider' ), // Block title.
	description: __( 'futurelab slider block' ), // Block description.
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'fl-Blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'futurelab slider block' ) ],

	attributes: {
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
				},
			],
		},
		// swiperSliderHTML: {
		// 	type: 'string',
		// 	source: 'html',
		// 	selector: '.swiper-wrapper',
		// },

		// sliderQuery: {
		// 	type: 'array',
		// 	source: 'query',
		// 	selector: '.slider-container',
		// 	query: {
		// 		style: {
		// 			type: 'string',
		// 			source: 'attribute',
		// 			attribute: 'style',
		// 		},
		// 		overlay: {
		// 			type: 'string',
		// 			source: 'html',
		// 			attribute: 'overlay-slider',
		// 		},
		// 	},
		// },
		// sliderMeta: {
		// 	type: 'array',
		// 	source: 'meta',
		// 	meta: 'sliderMeta',
		// 	default: [
		// 		{
		// 			image: '',
		// 			title: 'please enter title',
		// 			content: 'please enter content',
		// 			btnLabel: 'button label',
		// 			btnUrl: 'button URL',
		// 		},
		// 	],
		// },

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
		alignContent: {
			type: 'string',
			default: 'left',
		},
	},
	// Made edit as a class component for react lifecycle(componentDidMount)
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
			this.state = {
				slidesArray: [],
				alignContent: 'left',
			};
		}
		// component finish loading
		componentDidMount() {
			const { attributes, setAttributes } = this.props;
			const { swiperSlide } = attributes;

			// define new
			const newSlidesArray = [];
			// format swiper data
			swiperSlide.map( slideItem => {
				// content in each slide
				const content =
					slideItem.props.children[ 0 ].props.children[ 0 ].props.children;

				console.log(
					'slideItem.props.children',
					slideItem.props.children[ 0 ].props.children
				);
				const data = {};
				// regular expression to match url
				data.image = slideItem.props.style.match( /\(([^)]*)\)/ )[ 1 ];
				content.map( contentItem => {
					const itemClass = contentItem.props.class;
					// const { twitter: tweet, facebook: fb } = wes.links.social;
					switch ( itemClass ) {
						case 'slide-title':
							// data.title = contentItem.props.children.toString();
							data.title = contentItem.props.children
								.toString()
								.split( '[object Object]' ) // TODO: need to find a proper way to do this....
								.join( '<br/>' )
								.split( ',' ) // TODO: need to find a proper way to do this....
								.join( '' );
							console.log( data.title );
							break;
						case 'slide-content':
							data.content = contentItem.props.children
								.toString()
								.split( '[object Object]' ) // TODO: need to find a proper way to do this....
								.join( '<br/>' )
								.split( ',' ) // TODO: need to find a proper way to do this....
								.join( '' );
							break;
						case 'slide-btn-container':
							data.btnLabel = contentItem.props.children[ 0 ].props.children[ 0 ].toString();
							data.btnUrl = contentItem.props.children[ 0 ].props.href.toString();
							break;

						default:
							break;
					}
				} );
				newSlidesArray.push( data );
			} );

			// first time add slider block, do not need to store the data on page to state and attribute
			if ( newSlidesArray.length > 0 ) {
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
			const { setAttributes } = this.props;
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
				// swiperSliderHTML,
				// sliderQuery,
				// sliderMeta,
			} = attributes;
			const { slidesArray, alignContent } = this.state;
			console.log( 'alignContentRender', alignContent );
			// console.log( 'swiperSliderHTML', swiperSliderHTML );
			// console.log( 'sliderQuery', sliderQuery );
			// console.log( 'sliderMeta', sliderMeta );
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
										alignContent={alignContent}
										btnLabel={btnLabel}
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
								{/* <Button
									isDefault
									onClick={() => {
										console.log( 'click' );
										this.setState( { alignContent: 'left' } );
										setAttributes( { alignContent: 'left' } );
									}}
								>
									left
								</Button>
								<Button
									isDefault
									onClick={() => {
										this.setState( { alignContent: 'center' } );
										setAttributes( { alignContent: 'center' } );
									}}
								>
									center
								</Button>
								<Button
									isDefault
									onClick={() => {
										this.setState( { alignContent: 'right' } );
										setAttributes( { alignContent: 'right' } );
									}}
								>
									right
								</Button> */}
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
								{/* <RichText
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
								/> */}
								{/* <URLInput
									value={slidesArray[ currentIndex ].btnUrl}
									// onChange={( url, post ) =>
									// 	setAttributes( {
									// 		url,
									// 		text: ( post && post.title ) || 'Click here',
									// 	} )
									// }
									style={{ zIndex: 100000 }} // TODO: bring the search to front
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
								/> */}
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
	},

	save: ( { attributes } ) => {
		const { slides = [], alignContent } = attributes;
		console.log( 'alignContentSave', alignContent );
		console.log( 'alignContentSave', alignContent === 'right' );

		function addhttp( url ) {
			console.log( 'url', url );

			let newUrl = '';
			if ( ! url.match( /^(http|https)/ ) ) {
				newUrl = `http://${ url }`;
				return newUrl;
			}

			return url;
		}

		console.log( 'new url', addhttp( 'http://vagrant.headless.local/about/' ) );

		return (
			<div>
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{slides.map( ( slide, i ) => {
							const { image, title, content, btnLabel, btnUrl } = slide;
							const styles = {
								backgroundImage: `url(${ image })`,
								// backgroundSize: 'cover',
								// backgroundRepeat: 'no-repeat',
								// backgroundPosition: '50% 60%',
								// height: '600px',
							};
							return (
								<div key={i} className="swiper-slide" style={styles}>
									<div className="overlay-slider">
										<div className="slider-container alignwide">
											<h2
												className={'slide-title'}
												style={{
													justifyContent:
														alignContent === 'right' ?
															'flex-end' :
															alignContent,
												}}
												dangerouslySetInnerHTML={{ __html: title }}
											>
												{/* {title} */}
											</h2>
											<p
												className={'slide-content'}
												style={{
													// height: '200px',
													justifyContent:
														alignContent === 'right' ?
															'flex-end' :
															alignContent,
												}}
												dangerouslySetInnerHTML={{ __html: content }}
											/>
											<div
												className={'slide-btn-container'}
												style={{
													justifyContent:
														alignContent === 'right' ?
															'flex-end' :
															alignContent,
												}}
											>
												<a
													className={'slide-btn fl-button'}
													href={addhttp( `${ btnUrl }` )}
												>
													{btnLabel}
												</a>
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
	},
	useOnce: false,
	supports: {
		align: true,
		alignWide: true,
		customClassName: false,
	},
} );
