/*
 * @Author: Hank
 * @Date: 2019-08-23 14:07:43
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-23 14:18:31
 */

/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.editor;

// Import Inspector components
const { PanelBody, RangeControl, ToggleControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<RangeControl
						label={__( 'Title Font Size' )}
						value={this.props.attributes.accordionFontSize}
						onChange={value =>
							this.props.setAttributes( { accordionFontSize: value } )
						}
						min={14}
						max={24}
						step={1}
					/>

					<ToggleControl
						label={__( 'Open by default' )}
						checked={this.props.attributes.accordionOpen}
						onChange={() =>
							this.props.setAttributes( {
								accordionOpen: ! this.props.attributes.accordionOpen,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
