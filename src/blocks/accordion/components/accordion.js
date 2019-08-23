/*
 * @Author: Hank
 * @Date: 2019-08-23 14:07:59
 * @Last Modified by: Hank
 * @Last Modified time: 2019-08-23 14:51:55
 */

/**
 * Accordion Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Accordion wrapper Component
 */
export default class Accordion extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<div
				className={classnames(
					this.props.className,
					this.props.attributes.accordionAlignment ?
						'fl-align-' + this.props.attributes.accordionAlignment :
						undefined,
					'fl-block-accordion',
					this.props.attributes.accordionFontSize ?
						'fl-font-size-' + this.props.attributes.accordionFontSize :
						null
				)}
			>
				{this.props.children}
			</div>
		);
	}
}
