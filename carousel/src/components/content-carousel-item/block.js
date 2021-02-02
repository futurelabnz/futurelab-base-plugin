import './style.scss';
import './editor.scss';

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

import edit from './edit';
import save from './save';

registerBlockType( 'futurelab-base-plugin/carousel-item', {
	apiVersion: 2,
	title: __( 'carousel item' ), // Block title.
	parent: [ 'futurelab-base-plugin/carousel' ],
	icon: {
		src: 'wordpress-alt',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category
	keywords: [
		//Keywords
		__( 'futurelab' ),
		__( 'carousel' ),
	],
	edit: edit,
	save: save,
} );
