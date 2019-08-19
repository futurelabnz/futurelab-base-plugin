/*
 * @Author: Hank
 * @Date: 2019-05-10 09:08:46
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-20 10:29:56
 */

// TODO: Fix the content width on backend editor, the content can go out side of div...

//  Import CSS.
import './style.scss';
import './editor.scss';
import { Slide, LeftArrow, RightArrow } from './components/slider';
import { scrolldownArrow } from './icons';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

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
	},
	// Made edit as a class component for react lifecycle(componentDidMount)
	edit: edit,
	save: save,
	deprecated: deprecated,
	useOnce: false,
	supports: {
		align: true,
		alignWide: true,
	},
} );
