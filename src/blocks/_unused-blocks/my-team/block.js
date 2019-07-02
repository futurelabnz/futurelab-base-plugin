/* eslint-disable react/jsx-key */
/*
 * @Author: Hank
 * @Date: 2019-05-24 10:49:35
 * @Last Modified by: Hank
 * @Last Modified time: 2019-05-28 10:34:31
 */

/* eslint-disable prefer-const */
/* eslint-disable no-console */

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

// FIXME: need to upate page to regenerate HTML if member updated
registerBlockType( 'futurelab/block-my-team', {
	title: __( 'fl My Team Block' ),
	description: __( 'futurelab Layout Container' ),
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	},
	category: 'fl-Blocks',
	keywords: [ __( 'futurelab slider block' ) ],

	attributes: {
		teamMembers: {
			type: 'Array',
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
