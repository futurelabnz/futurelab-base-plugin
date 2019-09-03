/*
 * @Author: Hank
 * @Date: 2019-08-23 14:07:54
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-23 14:51:55
 */

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const { RichText, AlignmentToolbar, BlockControls, InnerBlocks } = wp.editor;

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={this.props.attributes.accordionAlignment}
					onChange={value =>
						this.props.setAttributes( { accordionAlignment: value } )
					}
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector {...this.props} />,

			// Show the button markup in the editor
			<Accordion {...this.props}>
				<RichText
					tagName="p"
					placeholder="Accordion Title"
					value={this.props.attributes.accordionTitle}
					className="fl-accordion-title"
					onChange={value =>
						this.props.setAttributes( { accordionTitle: value } )
					}
				/>

				<div className="fl-accordion-text">
					<InnerBlocks />
				</div>
			</Accordion>,
		];
	}
}
