/*
 * @Author: Hank
 * @Date: 2019-08-23 14:07:37
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-23 14:50:21
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
		return (
			<Accordion {...this.props}>
				<details open={this.props.attributes.accordionOpen}>
					<summary className="fl-accordion-title">
						<RichText.Content value={this.props.attributes.accordionTitle} />
					</summary>
					<div className="fl-accordion-text">
						<InnerBlocks.Content />
					</div>
				</details>
			</Accordion>
		);
	}
}
