/*
 * @Author: Hank
 * @Date: 2019-06-11 12:01:19
 * @Last Modified by: Hank
 * @Last Modified time: 2019-06-11 13:16:40
 */
/* eslint-disable react/jsx-key */

//  Import CSS.
import './style.scss';
import './editor.scss';

import edit from './edit';
import save from './save';

const { Button, Modal, Placeholder } = wp.components;
const { RichText, InnerBlocks } = wp.editor;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

// now using PHP render frontend, needs to add feature alignwide and alignfull to frontend.php
registerBlockType( 'futurelab/block-cover-image', {
	title: __( 'fl cover image' ),
	description: __( 'futurelab Cover Image block' ),
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	},
	category: 'fl-Blocks',
	keywords: [ __( 'Cover Image' ) ],

	attributes: {
		backgroundColor: {
			source: 'attribute',
			type: 'string',
			attribute: 'data-bgc',
			selector: '.fl-cover-image',
			default: '',
		},
		imageUrl: {
			source: 'attribute',
			type: 'string',
			attribute: 'data-imageUrl',
			selector: '.fl-cover-image',
			default: '',
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
