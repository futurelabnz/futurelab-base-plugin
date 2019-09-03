/*
 * @Author: Hank
 * @Date: 2019-09-03 14:15:09
 * @Last Modified by: Hank
 * @Last Modified time: 2019-09-03 15:51:05
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
					<ToggleControl
						label={__( 'Auto Slide' )}
						checked={this.props.attributes.autoSlide}
						onChange={() =>
							this.props.setAttributes( {
								autoSlide: ! this.props.attributes.autoSlide,
							} )
						}
					/>
					<RangeControl
						label={__( 'Auto Slide Speed' )}
						value={this.props.attributes.autoplaySpeed}
						onChange={value =>
							this.props.setAttributes( { autoplaySpeed: value } )
						}
						min={500}
						max={10000}
						step={500}
					/>
					<ToggleControl
						label={__( 'Infinite Loop' )}
						checked={this.props.attributes.infiniteLoop}
						onChange={() =>
							this.props.setAttributes( {
								infiniteLoop: ! this.props.attributes.infiniteLoop,
							} )
						}
					/>
					<ToggleControl
						label={__( 'Display Pagination' )}
						checked={this.props.attributes.isShowPagination}
						onChange={() =>
							this.props.setAttributes( {
								isShowPagination: ! this.props.attributes.isShowPagination,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
