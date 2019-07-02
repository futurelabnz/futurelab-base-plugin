/* eslint-disable react/jsx-key */
/*
 * @Author: Hank
 * @Date: 2019-05-24 10:49:35
 * @Last Modified by: Hank
 * @Last Modified time: 2019-06-07 10:57:49
 */

/* eslint-disable prefer-const */
/* eslint-disable no-console */

//  Import CSS.
import './style.scss';
import './editor.scss';
import Inspector from './components/Inspector';
const { Button, Modal, Placeholder } = wp.components;
const { RichText, InnerBlocks } = wp.editor;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'futurelab/block-layout-container', {
	title: __( 'fl Color Layout Container' ),
	description: __( 'futurelab Layout Container' ),
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	},
	category: 'fl-Blocks',
	keywords: [ __( 'futurelab slider block' ) ],

	attributes: {
		backgroundColor: {
			source: 'attribute',
			type: 'string',
			attribute: 'data-bgc',
			selector: '.fl-layout-container',
			default: '',
		},
		imageUrl: {
			source: 'attribute',
			type: 'string',
			attribute: 'data-imageUrl',
			selector: '.fl-layout-container',
			default: '',
		},
	},
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
			this.state = {};
		}
		// component finish loading
		componentDidMount() {
			const { attributes, setAttributes } = this.props;
		}

		render() {
			const { attributes, setAttributes, className } = this.props;
			const { backgroundColor, imageUrl } = attributes;
			console.log( 'backgroundColor', backgroundColor );

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
					{/* <InnerBlocks template={TEMPLATE} isFocused /> */}
					<InnerBlocks template={TEMPLATE} />
				</div>,
			];
		}
	},

	save: ( { attributes, setAttributes } ) => {
		const { backgroundColor, imageUrl } = attributes;
		console.log( 'backgroundColor', backgroundColor );
		return (
			<div
				className={'fl-layout-container'}
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
				<InnerBlocks.Content />
			</div>
		);
	},
	useOnce: false,
	supports: {
		align: true,
		alignWide: true,
		customClassName: false,
	},
} );
