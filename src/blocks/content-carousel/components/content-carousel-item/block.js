/**
 * BLOCK: my-test-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor; //Import inner blocks from wp.editor

import edit from './edit';
import save from './save';

registerBlockType( 'futurelab/block-fl-content-carousel-item', {
	title: __( 'carousel item' ), // Block title.
	parent: [ 'futurelab/block-fl-content-carousel' ],
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'fl-Blocks', // Block category
	keywords: [
		//Keywords
		__( 'futurelab' ),
		__( 'carousel' ),
	],
	attributes: {
		//Attributes
		currentSlide: {
			type: 'Number',
			default: 0,
		},
	},
	edit: edit,
	save: save,
} );
