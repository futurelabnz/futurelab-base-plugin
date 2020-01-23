/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */

const { Button, Modal, TextControl } = wp.components;
const { RichText, URLInput, InnerBlocks } = wp.editor;
const { Component } = wp.element;

export default class extends Component {
	constructor(props) {
		super(...arguments);
		this.props = props;
	}
	// component finish loading
	componentDidMount() {
		const { attributes, setAttributes } = this.props;
	}
	render() {
		//JSX to return
		const { attributes, setAttributes, className } = this.props;
		const TEMPLATE = [['futurelab/slide']];
		return (
			<div className={className}>
				<InnerBlocks
					template={TEMPLATE}
				/>
			</div>
		);
	}
}
