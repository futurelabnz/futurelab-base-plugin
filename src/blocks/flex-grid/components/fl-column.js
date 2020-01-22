/*
 * @Author: Hank
 * @Date: 2019-05-16 10:39:23
 * @Last Modified by: Hank
 * @Last Modified time: 2019-05-23 17:09:04
 */
/* eslint-disable prefer-const */
/* eslint-disable no-console */

//  Import CSS.
// import './style.scss';
// import './editor.scss';
const { applyFilters } = wp.hooks;
const { Button, Modal, Placeholder } = wp.components;
const { RichText, InnerBlocks } = wp.editor;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType( 'futurelab/block-fl-block-flex-gird-column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'fl flex gird column' ), // Block title.
	parent: [ 'futurelab/block-fl-block-flex-gird1' ],
	description: __( 'futurelab flex grild block' ), // Block description.
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	}, // Block icon from Dashicons â†’ https://developer.wordpress.org/resource/dashicons/.
	category: 'fl-Blocks', // Block category  Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'futurelab slider block' ) ],

	attributes: {
		attributesTest: {
			type: 'string',
			default: '',
		},
		// have to have the class name so can pass to child block
		className: {
			type: 'string',
			default: '',
		},
		width: {
			type: 'string',
			default: '',
		},
	},
	// Made edit as a class component for react lifecycle(componentDidMount)
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
			this.state = {
				isShowCustomizeModal: false,
				cutomizeColumn: '',
				layoutArray: '', // the layout user select
			};
		}
		// component finish loading
		componentDidMount() {}
		// get slide width from dom
		getInnerBlockWidth = () => {
			return document.querySelector( '.block-editor-block-list__block-edit' )
				.clientWidth;
		};

		render() {
			const { attributes, setAttributes, className } = this.props;
			const { width } = attributes;
			console.log( 'getInnerBlockWidth', this.getInnerBlockWidth() ); // get width from child block or break block
			// applyFilters( 'futurelab/block.className', 'random-class-name' );
			console.log(
				'`${ ( this.getInnerBlockWidth() / 12 ) * width }px` ',
				`${ ( this.getInnerBlockWidth() / 12 ) * width }px`
			);

			console.log( 'this.props', this.props );
			return (
				<div
					className={'fl-innerblock'}
					style={{ width: `${ ( this.getInnerBlockWidth() / 12 ) * width }px` }}
				>
					<InnerBlocks
						template={[ [ 'core/column', {}, [] ] ]}
						// className="grid-x grid-padding-x fl-selected-layout"
					/>
				</div>
			);
		}
	},

	save: ( { attributes } ) => {
		// const classNameValue = '';
		// applyFilters( 'futurelab/block.className', 'random-class-name' );
		const { className } = attributes;
		return (
			<div>
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
