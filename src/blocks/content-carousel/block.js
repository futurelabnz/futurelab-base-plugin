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
import deprecated from './deprecated';

registerBlockType( 'futurelab/block-fl-content-carousel', {
	title: __( 'Futurelab content carousel' ), // Block title.
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
		autoSlide: {
			type: 'boolean',
			default: true,
		},
		autoplaySpeed: {
			type: 'number',
			default: 5000,
		},
		infiniteLoop: {
			type: 'boolean',
			default: true,
		},
		isShowPagination: {
			type: 'boolean',
			default: true,
		},
	},
	edit: edit,
	save: save,
	deprecated: deprecated,
	useOnce: false,
	supports: {
		align: true,
		alignWide: true,
	},
} );
