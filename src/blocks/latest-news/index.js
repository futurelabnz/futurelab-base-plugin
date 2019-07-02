/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';

//  Import CSS.
import './style.scss';
import './editor.scss';

const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( 'futurelab/latest-news', {
	title: __( 'Latest News' ),
	description: __( 'Display latest news.' ),
	icon,
	category: 'fl-Blocks',
	keywords: [ __( 'recent news' ) ],
	supports: {
		align: true,
		html: false,
	},
	edit,
} );
