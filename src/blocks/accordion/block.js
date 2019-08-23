/*
 * @Author: Hank
 * @Date: 2019-08-23 14:02:12
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-23 15:38:14
 */

// Import block dependencies and components
import Edit from './components/edit';
import Save from './components/save';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

const blockAttributes = {
	accordionTitle: {
		type: 'array',
		selector: '.fl-accordion-title',
		source: 'children',
	},
	accordionText: {
		type: 'array',
		selector: '.fl-accordion-text',
		source: 'children',
	},
	accordionAlignment: {
		type: 'string',
	},
	accordionFontSize: {
		type: 'number',
		default: null,
	},
	accordionOpen: {
		type: 'boolean',
		default: false,
	},
};

// Register the block
registerBlockType( 'futurelab/block-accordion', {
	title: __( 'fl Accordion' ),
	description: __( 'futurelab accordion block' ),
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	},
	category: 'fl-Blocks',
	keywords: [ __( 'futurelab accordion block' ) ],
	attributes: blockAttributes,

	// Render the block components
	edit: props => {
		return <Edit {...props} />;
	},

	// Save the attributes and markup
	save: props => {
		return <Save {...props} />;
	},
} );
