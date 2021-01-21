import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

const blockStyle = {
	backgroundColor: '#900',
	color: '#fff',
	padding: '20px',
};

registerBlockType( 'futurelab-base-plugin/accordion', {
	title: __( 'Accordion', 'futurelab-base-plugin' ),
	icon: 'wordpress',
	category: 'layout',
	example: {},
	edit() {
		return (
			<div style={ blockStyle }>
				Hello World, step 1 12323(from the editor).
			</div>
		);
	},
	save() {
		return (
			<div style={ blockStyle }>
				Hello World, step 1 (from the frontend).
			</div>
		);
	},
} );
