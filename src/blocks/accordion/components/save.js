/*
 * @Author: Hank
 * @Date: 2019-08-23 14:07:37
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-26 10:12:11
 */
// Import block dependencies and components
import Accordion from './accordion';

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const { RichText, InnerBlocks } = wp.editor;

export default class Save extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { accordionOpen } = this.props.attributes;

		console.log( 'accordionOpen', accordionOpen );
		return (
			<Accordion {...this.props}>
				<button
					className={`accordion fl-accordion-title ${
						accordionOpen ? 'active' : ''
					}`}
				>
					<RichText.Content value={this.props.attributes.accordionTitle} />
				</button>
				<div
					className="panel"
					style={`display: ${ accordionOpen ? 'block' : 'none' }`}
				>
					<InnerBlocks.Content />
				</div>
			</Accordion>
		);
	}
}
