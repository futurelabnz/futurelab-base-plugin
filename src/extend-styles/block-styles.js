const { registerBlockStyle } = wp.blocks;

import './style.scss';

// Add customized button style
registerBlockStyle( 'core/button', {
	name: 'fl-customized-button',
	label: 'fl button',
} );

// Add customized separator style
registerBlockStyle( 'core/separator', {
	name: 'fl-customized-separator-shadow-bottom',
	label: 'Fullwidth shadow line underneath',
} );

// Add customized separator style
registerBlockStyle( 'core/separator', {
	name: 'fl-customized-separator-shadow-above',
	label: 'Fullwidth shadow line above',
} );

// Add customized separator style
registerBlockStyle( 'core/separator', {
	name: 'fl-customized-separator-line',
	label: 'Fullwidth separator line',
} );
