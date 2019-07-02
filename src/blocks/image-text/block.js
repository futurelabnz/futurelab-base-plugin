/*
 * @Author: Hank
 * @Date: 2019-05-07 14:53:25
 * @Last Modified by: Hank
 * @Last Modified time: 2019-06-11 16:32:22
 */
/**
 * BLOCK: fl-block-base
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import MediaContainer, { imageFillStyles } from './MediaContainer';
import { get, noop } from 'lodash';

const { __, _x } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { AlignmentToolbar, BlockControls, InnerBlocks } = wp.editor;
const { Toolbar } = wp.components;
const { Fragment } = wp.element;

const ALLOWED_BLOCKS = [
	'core/button',
	'core/paragraph',
	'core/heading',
	'core/list',
];
const TEMPLATE = [
	[ 'core/paragraph', { placeholder: _x( 'Content', 'content placeholder' ) } ],
];

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'futurelab/block-fl-block-image-text', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'fl image text' ), // Block title.
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'fl-Blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'fl-block-base futurelab Block' ) ],
	// declear attributes
	attributes: {
		message: {
			type: 'array',
			source: 'children',
			selector: '.message-body',
		},
		mediaPosition: {
			type: 'string',
			default: 'left',
		},
		mediaWidth: {
			type: 'string',
			default: 'large-4 medium-4 small-12',
		},
		contentWidth: {
			type: 'string',
			default: 'large-8 medium-8 small-12',
		},
		isFullWidth: {
			type: 'boolean',
			default: false,
		},
		// textAlignment: {
		// 	type: 'string',
		// },
		align: {
			type: 'string',
			default: 'wide',
		},
		backgroundColor: {
			type: 'string',
		},
		customBackgroundColor: {
			type: 'string',
		},
		mediaAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'figure img',
			attribute: 'alt',
			default: '',
		},
		mediaId: {
			type: 'number',
		},
		mediaUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'figure video,figure img',
			attribute: 'src',
		},
		mediaType: {
			type: 'string',
		},
		isStackedOnMobile: {
			type: 'boolean',
			default: false,
		},
	},
	edit: function( props ) {
		// try make edit as a component
		const {
			attributes: {
				// textAlignment,
				// message,
				mediaPosition,
				mediaWidth,
				mediaAlt,
				mediaId,
				// mediaPosition,
				mediaType,
				mediaUrl,
				// mediaWidth,
				// imageFill,
				// focalPoint,
				contentWidth,
				isFullWidth,
			},
			className,
			setAttributes,
		} = props;

		const toolbarControls = [
			{
				icon: 'align-pull-left',
				title: __( 'Show media on left' ),
				isActive: mediaPosition === 'left',
				onClick: () => setAttributes( { mediaPosition: 'left' } ),
			},
			{
				icon: 'align-pull-right',
				title: __( 'Show media on right' ),
				isActive: mediaPosition === 'right',
				onClick: () => setAttributes( { mediaPosition: 'right' } ),
			},
			// {
			// 	icon: 'id',
			// 	title: __( ' 1/3' ),
			// 	isActive: mediaWidth === '30%',
			// 	onClick: () => setAttributes( { mediaWidth: '30%' } ),
			// },
			// {
			// 	icon: 'id-alt',
			// 	title: __( ' 1/2' ),
			// 	isActive: mediaWidth === '50%',
			// 	onClick: () => setAttributes( { mediaWidth: '50%' } ),
			// },
			{
				icon: 'id',
				title: __( 'Show mediaWidth 1/3' ),
				isActive: mediaWidth === 'large-4 medium-4 small-12',
				onClick: () =>
					setAttributes( {
						mediaWidth: 'large-4 medium-4 small-12',
						contentWidth: 'large-8 medium-8 small-12',
					} ),
			},
			{
				icon: 'id-alt',
				title: __( 'Show mediatWith 1/2' ),
				isActive: mediaWidth === 'large-6 medium-6 small-12',
				onClick: () =>
					setAttributes( {
						mediaWidth: 'large-6 medium-6 small-12',
						contentWidth: 'large-6 medium-6 small-12',
					} ),
			},
			// {
			// 	icon: 'leftright',
			// 	title: __( 'Full width' ),
			// 	isActive: isFullWidth === true,
			// 	onClick: () =>
			// 		setAttributes( {
			// 			isFullWidth: true,
			// 		} ),
			// },
			// {
			// 	icon: 'grid-view',
			// 	title: __( 'Boxed' ),
			// 	isActive: isFullWidth === false,
			// 	onClick: () =>
			// 		setAttributes( {
			// 			isFullWidth: false,
			// 		} ),
			// },
		];

		// const style = {
		// 	gridTemplateColumns:
		// 		'right' === mediaPosition ? `auto ${ mediaWidth }` : `${ mediaWidth } auto`,
		// 	// backgroundColor: backgroundColor.color,
		// };

		function renderMediaArea() {
			return (
				<MediaContainer
					className="block-library-media-text__media-container"
					// onSelectMedia={this.onSelectMedia}
					// onWidthChange={this.onWidthChange}
					onSelectMedia={media => {
						console.log( 'media', media );
						let mediaType;
						let src;
						// for media selections originated from a file upload.
						if ( media.media_type ) {
							if ( media.media_type === 'image' ) {
								mediaType = 'image';
							} else {
								// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
								// video contain the media type of 'file' in the object returned from the rest api.
								mediaType = 'video';
							}
						} else {
							// for media selections originated from existing files in the media library.
							mediaType = media.type;
						}

						if ( mediaType === 'image' ) {
							// Try the "large" size URL, falling back to the "full" size URL below.
							src =
								get( media, [ 'sizes', 'large', 'url' ] ) ||
								get( media, [ 'media_details', 'sizes', 'large', 'source_url' ] );
						}

						setAttributes( {
							mediaAlt: media.alt,
							mediaId: media.id,
							mediaType,
							mediaUrl: src || media.url,
							// imageFill: undefined, // for backgroundImage, not using now
							// focalPoint: undefined,
						} );
					}}
					// for resizable box
					// onWidthChange={value => {
					// 	console.log( 'width', value );
					// 	// this.setState( {
					// 	// 	mediaWidth: value,
					// 	// } );
					// }}
					// commitWidthChange={width => {
					// 	console.log( 'width', width );
					// 	// setAttributes( {
					// 	// 	mediaWidth: width,
					// 	// } );
					// }}
					{...{
						mediaAlt,
						mediaId,
						mediaType,
						mediaUrl,
						mediaPosition,
						// mediaWidth,
						// imageFill,
						// focalPoint,
					}}
				/>
			);
		}

		// Creates a <p class='wp-block-futurelab-block-fl-block-base'></p>.
		return (
			<div className={className}>
				<BlockControls>
					{/* <AlignmentToolbar
						value={textAlignment}
						onChange={value => setAttributes( { textAlignment: value } )}
					/> */}
					<Toolbar controls={toolbarControls} />
				</BlockControls>

				{/* <div
					className={`wp-block-media-text ${
						mediaPosition === 'right' ? 'has-media-on-the-right' : ''
					}`}
					style={style}
				>
					<div className={'components-placeholder'}>{renderMediaArea()}</div>
					<div className={'editor-inner-blocks'}>
						<InnerBlocks
							allowedBlocks={ALLOWED_BLOCKS}
							template={TEMPLATE}
							templateInsertUpdatesSelection={false}
						/>
					</div>
				</div> */}
				<div className={isFullWidth ? '' : 'grid-container'}>
					<div className={'grid-x grid-padding-x'}>
						{/* render block base on user choosed layout */}
						{mediaPosition === 'right' ? (
							<Fragment>
								<div className={`${ contentWidth }`}>
									<div className="text-content">
										<InnerBlocks
											allowedBlocks={ALLOWED_BLOCKS}
											template={TEMPLATE}
											templateInsertUpdatesSelection={false}
										/>
									</div>
								</div>
								<div className={`${ mediaWidth }`}>{renderMediaArea()}</div>
							</Fragment>
						) : (
							<Fragment>
								<div className={`${ mediaWidth }`}>{renderMediaArea()}</div>
								<div className={`${ contentWidth }`}>
									<div className="text-content">
										<InnerBlocks
											allowedBlocks={ALLOWED_BLOCKS}
											template={TEMPLATE}
											templateInsertUpdatesSelection={false}
										/>
									</div>
								</div>
							</Fragment>
						)}
					</div>
				</div>
			</div>
		);
	},
	save: function( props ) {
		const {
			attributes: {
				// textAlignment,
				// message,
				isStackedOnMobile,
				mediaPosition,
				mediaWidth,
				mediaAlt,
				mediaId,
				// mediaPosition,
				mediaType,
				mediaUrl,
				// mediaWidth,
				imageFill,
				focalPoint,
				contentWidth,
				isFullWidth,
			},
		} = props;
		// const DEFAULT_MEDIA_WIDTH = '50%';

		const mediaTypeRenders = {
			image: () => (
				<img
					src={mediaUrl}
					alt={mediaAlt}
					className={
						mediaId && mediaType === 'image' ? `wp-image-${ mediaId }` : null
					}
				/>
			),
			video: () => <video controls src={mediaUrl} />,
		};

		// const backgroundStyles = imageFill ?
		// 	imageFillStyles( mediaUrl, focalPoint ) :
		// 	{};

		// let gridTemplateColumns;
		// if ( mediaWidth !== DEFAULT_MEDIA_WIDTH ) {
		// 	gridTemplateColumns =
		// 		'right' === mediaPosition ? `auto ${ mediaWidth }` : `${ mediaWidth } auto`;
		// }
		// const style = {
		// 	// backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		// 	gridTemplateColumns,
		// };
		return (
			<div>
				{/* <div
					className={`wp-block-media-text ${
						mediaPosition === 'right' ? 'has-media-on-the-right' : ''
					}`}
					style={style}
				>
					<figure
						className="wp-block-media-text__media"
						style={backgroundStyles}
					>
						{( mediaTypeRenders[ mediaType ] || noop )()}
					</figure>
					<div className="wp-block-media-text__content message-body">
						<InnerBlocks.Content />
					</div>
				</div> */}
				<div className={isFullWidth ? '' : 'grid-container'}>
					<div className={'grid-x grid-padding-x'}>
						{/* render block base on user choosed layout */}
						{mediaPosition === 'right' ? (
							<Fragment>
								<div className={`${ contentWidth }`}>
									<div className="text-content">
										<InnerBlocks.Content />
									</div>
								</div>
								<div className={`${ mediaWidth }`}>
									<figure
										className="wp-block-media-text__media"
										// style={backgroundStyles}
									>
										{( mediaTypeRenders[ mediaType ] || noop )()}
									</figure>
								</div>
							</Fragment>
						) : (
							<Fragment>
								<div className={`${ mediaWidth }`}>
									<figure
										className="wp-block-media-text__media"
										// style={backgroundStyles}
									>
										{( mediaTypeRenders[ mediaType ] || noop )()}
									</figure>
								</div>
								<div className={`${ contentWidth }`}>
									<div className="text-content">
										<InnerBlocks.Content />
									</div>
								</div>
							</Fragment>
						)}
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
