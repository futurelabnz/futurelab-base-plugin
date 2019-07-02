/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */

const { withSelect } = wp.data;
const { compose, withState } = wp.compose;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, PanelRow, TextControl, Button } = wp.components;

import Inspector from './components/Inspector';

export default class extends Component {
	constructor( props ) {
		// console.log( 'props', props );

		super( ...arguments );
		this.props = props;
		this.state = {};
	}
	// component finish loading
	componentDidMount() {}

	render() {
		const { attributes, setAttributes, className } = this.props;
		const { backgroundColor, imageUrl } = attributes;
		const TEMPLATE = [ [ 'core/column', {}, [] ] ];

		return [
			<Inspector {...{ setAttributes, ...this.props }} />,,
			<div
				className={className}
				style={{
					backgroundColor: backgroundColor,
					backgroundImage: `url(${ imageUrl })`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '50% 60%',
					minHeight: '200px',
				}}
				data-bgc={backgroundColor}
				data-imageUrl={imageUrl}
			>
				<InnerBlocks template={TEMPLATE} isFocused />
				{/* <InnerBlocks template={TEMPLATE} /> */}
			</div>,
		];
	}
}
