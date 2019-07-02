/*
 * @Author: Hank
 * @Date: 2019-05-01 15:08:18
 * @Last Modified by: Hank
 * @Last Modified time: 2019-06-07 11:16:44
 */

/* eslint-disable react/jsx-key */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-undef */
/**
 * BLOCK: fl-color-btn-block
 *
 * title content and image at left and two buttons
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, PanelRow, TextControl } = wp.components;

/**
 * registerBlock
 */
// social block needs to enqueue fontawesome in wordpress theme and admin
registerBlockType( 'fl/block-fl-color-social-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Social Block' ), // Block title.
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'smartphone',
	}, // Block icon from Dashicons  https://developer.wordpress.org/resource/dashicons/.
	category: 'fl-Blocks', // Block category Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'futureLab block' ) ],

	//available attributes of the block
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.title',
		},
		content: {
			type: 'string',
			source: 'text',
			selector: '.block-content',
		},
		facebookURL: {
			type: 'url',
			default: '#',
		},
		twitterURL: {
			type: 'url',
			default: '#',
		},
		instagramURL: {
			type: 'url',
			default: '#',
		},
		linkedURL: {
			type: 'url',
			default: '#',
		},
		youtubeURL: {
			type: 'url',
			default: '#',
		},
		facebookClasses: {
			// isShowFacebook???
			type: 'string',
			default: 'hide',
		},
		twitterClasses: {
			type: 'string',
			default: 'hide',
		},
		instagramClasses: {
			type: 'string',
			default: 'hide',
		},
		linkedClasses: {
			type: 'string',
			default: 'hide',
		},
		youtubeClasses: {
			type: 'string',
			default: 'hide',
		},
	},

	edit: function( props ) {
		const {
			setAttributes,
			className,
			attributes: {
				// title,
				// content,
				facebookURL,
				twitterURL,
				instagramURL,
				linkedURL,
				youtubeURL,
				facebookClasses,
				twitterClasses,
				instagramClasses,
				linkedClasses,
				youtubeClasses,
			},
		} = props;

		// set visibility in icons
		function iconVisibility( value, elClass ) {
			if ( value === '#' || value === '' ) {
				// for Not defined Jquery
				// eslint-disable-next-line no-undef
				$( elClass ).fadeOut( 200, function() {
					// eslint-disable-next-line no-undef
					$( elClass ).addClass( 'display-none' );
				} );

				return 'hide';
			}
			// eslint-disable-next-line no-undef
			$( elClass ).fadeIn( 200, function() {
				// eslint-disable-next-line no-undef
				$( elClass ).removeClass( 'display-none' );
			} );

			return '';
		}

		return [
			// InspactorControls
			<InspectorControls>
				<PanelBody
					className={'block-social-links'}
					title="Social Block Settings"
					initialOpen={true}
				>
					<PanelRow>
						Enter the button url here to navigate button when click.
					</PanelRow>
					<p>
						{__(
							'Enter the Social Button URLs bellow. Type # to hide social buttons'
						)}
					</p>

					<p>{__( 'Facebook' )}</p>
					<TextControl
						type="url"
						lable={'FacebookURL'}
						value={facebookURL}
						onChange={value => {
							setAttributes( { facebookURL: value } );
							setAttributes( {
								facebookClasses: iconVisibility( value, '.facebook' ),
							} );
						}}
					/>
					<p>{__( 'Twitter' )}</p>

					<TextControl
						type="url"
						lable={'TwitterURL'}
						value={twitterURL}
						onChange={value => {
							setAttributes( { twitterURL: value } );
							setAttributes( {
								twitterClasses: iconVisibility( value, '.twitter' ),
							} );
						}}
					/>

					<p>{__( 'Instagram' )}</p>
					<TextControl
						type="url"
						lable={'InstagramURL'}
						value={instagramURL}
						onChange={value => {
							setAttributes( { instagramURL: value } );
							setAttributes( {
								instagramClasses: iconVisibility( value, '.instagram' ),
							} );
						}}
					/>

					<p>{__( 'Linkedin' )}</p>
					<TextControl
						type="url"
						lable={'LinkedinURL'}
						value={linkedURL}
						onChange={value => {
							setAttributes( { linkedURL: value } );
							setAttributes( {
								linkedClasses: iconVisibility( value, '.linkedin' ),
							} );
						}}
					/>

					<p>{__( 'Youtube' )}</p>
					<TextControl
						type="url"
						lable={'YoutubeURL'}
						value={youtubeURL}
						onChange={value => {
							setAttributes( { youtubeURL: value } );
							setAttributes( {
								youtubeClasses: iconVisibility( value, '.youtube' ),
							} );
						}}
					/>
				</PanelBody>
			</InspectorControls>,
			// block editor view
			<div className={`${ className }`}>
				<div className={'social-icon-container'}>
					<a href={`${ facebookURL }`} className={`${ facebookClasses } facebook`}>
						<i className={'fab fa-facebook'} />
					</a>
					<a href={`${ twitterURL }`} className={`${ twitterClasses } twitter`}>
						<i className={'fab fa-twitter'} />
					</a>
					<a
						href={`${ instagramURL }`}
						className={`${ instagramClasses } instagram`}
					>
						<i className={'fab fa-instagram'} />
					</a>
					<a href={`${ linkedURL }`} className={`${ linkedClasses } linkedin`}>
						<i className={'fab fa-linkedin'} />
					</a>
					<a href={`${ youtubeURL }`} className={`${ youtubeClasses } youtube`}>
						<i className={'fab fa-youtube'} />
					</a>
				</div>
			</div>,
		];
	},

	save: function( props ) {
		const {
			// title,
			// content,
			facebookURL,
			facebookClasses,
			twitterURL,
			twitterClasses,
			instagramURL,
			instagramClasses,
			linkedURL,
			linkedClasses,
			youtubeURL,
			youtubeClasses,
		} = props.attributes;
		return (
			<div>
				<div className={'social-icon-container'}>
					<a href={`${ facebookURL }`} className={`${ facebookClasses } facebook`}>
						<i className={'fab fa-facebook'} />
					</a>
					<a href={`${ twitterURL }`} className={`${ twitterClasses } twitter`}>
						<i className={'fab fa-twitter'} />
					</a>
					<a
						href={`${ instagramURL }`}
						className={`${ instagramClasses } instagram`}
					>
						<i className={'fab fa-instagram'} />
					</a>
					<a href={`${ linkedURL }`} className={`${ linkedClasses } linkedin`}>
						<i className={'fab fa-linkedin'} />
					</a>
					<a href={`${ youtubeURL }`} className={`${ youtubeClasses } youtube`}>
						<i className={'fab fa-youtube'} />
					</a>
				</div>
			</div>
		);
	},
} );
