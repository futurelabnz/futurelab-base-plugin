/**
 * BLOCK: content-carousel-dev
 */

import './style.scss';
import './editor.scss';

import edit from './edit';
import save from './save';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor; //Import inner blocks from wp.editor

registerBlockType( 'futurelab/block-fl-content-carousel1', {
	title: __( 'Futurelab content carousel dev' ), // Block title.
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
		// slides array useful to loop and generate slide
		align: {
			type: 'string',
			default: 'full',
		},
		currentSlide: {
			type: 'Number',
			default: 0,
		},
	},
	edit: edit,
	save: save,
	useOnce: false,
	supports: {
		align: true,
		alignWide: true,
		customClassName: false,
	},
} );
