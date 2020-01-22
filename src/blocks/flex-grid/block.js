/**
 * block is unneeded
 * because gutenberg itself has add feature to change column width
 */

/* eslint-disable prefer-const */
/* eslint-disable no-console */
/*
 * @Author: Hank
 * @Date: 2019-05-15 12:00:17
 * @Last Modified by: Hank
 * @Last Modified time: 2020-01-23 12:23:54
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
const { Button, Modal, Placeholder } = wp.components;
const { RichText, InnerBlocks } = wp.editor;
const { Component, Fragment } = wp.element;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

// TODO: fix admin editor display innerblock grid issue
registerBlockType('futurelab/block-fl-block-flex-gird', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('fl flex gird'), // Block title.
	description: __('futurelab flex grild block'), // Block description.
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'fl-Blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__('futurelab slider block')],

	attributes: {
		// get data from HTML
		layoutSelector: {
			type: 'Array',
			selector: '.fl-flex-grid-save',
			source: 'children',
		},
		// generate HTML from data
		layoutArray: {
			type: 'Array',
			default: [],
		},
	},
	// Made edit as a class component for react lifecycle(componentDidMount)
	edit: class extends Component {
		constructor(props) {
			super(...arguments);
			this.props = props;
			this.state = {
				isShowCustomizeModal: false,
				cutomizeColumn: '',
				layoutArray: [], // the layout user select
			};
		}
		// component finish loading
		componentDidMount() {
			const { attributes, setAttributes } = this.props;
			const { layoutSelector } = attributes;

			const { clientId } = this.props;
			const { select } = wp.data;

			// select parentBlock
			const parentBlock = select('core/editor').getBlocksByClientId(
				clientId
			)[0];

			// select InnerBlock
			const childBlocks = parentBlock.innerBlocks;
			console.log('childBlocks', childBlocks);

			// get data from InnerBlock
			let newLayoutArray = [];
			// childBlocks.map( ( item, index ) => {
			// 	const { className } = item.attributes;
			// 	const layoutValue = className.split( ' ' )[ 0 ].split( '-' )[ 1 ];
			// 	newLayoutArray.push( layoutValue );
			// } );

			childBlocks.map((item, index) => {
				const { className } = item.attributes;
				console.log('split classname', className);
				const layoutValue = className.split(' ')[0].split('-')[1];
				newLayoutArray.push(layoutValue);
			});

			this.setState({ layoutArray: newLayoutArray });
		}

		// selected layout event handler
		selectLayoutHandler = layoutString => {
			console.log('layoutString', layoutString);
			const layoutArray = layoutString.split('-');
			console.log('layoutArray', layoutArray);

			// setState for component itself
			this.setState({ layoutArray: layoutArray });
			// setToAttributes for save function
			this.props.setAttributes({ layoutArray: layoutArray });
		};

		// render place holder for user to choose layout
		renderPlaceholder = () => {
			const { attributes, setAttributes, className } = this.props;
			const { isShowCustomizeModal } = this.state;
			return (
				<Fragment>
					<Placeholder
						label={__('Grid')}
						instructions={__('Select one layout to get started.')}
						className="grid-placeholder"
					>
						<div className={'button-container'}>
							{/* TODO: need to put in array to generate these buttons */}
							<Button
								isDefault
								onClick={() => {
									this.selectLayoutHandler('6-6');
								}}
							>
								6-6
							</Button>
							<Button
								isDefault
								onClick={() => {
									this.selectLayoutHandler('4-8');
								}}
							>
								4-8
							</Button>
							<Button
								isDefault
								onClick={() => {
									this.selectLayoutHandler('8-4');
								}}
							>
								8-4
							</Button>
							<Button
								isDefault
								onClick={() => {
									this.selectLayoutHandler('4-4-4');
								}}
							>
								4-4-4
							</Button>
							<Button
								isDefault
								onClick={() => {
									this.selectLayoutHandler('3-3-3-3');
								}}
							>
								3-3-3-3
							</Button>
							<Button
								isDefault
								onClick={() => {
									this.setState({ isShowCustomizeModal: true });
								}}
							>
								customize
							</Button>
						</div>
					</Placeholder>
					{/* Edit Modal */}
					<div>
						{isShowCustomizeModal && (
							<Modal
								title="Input your colomn sizes"
								onRequestClose={() =>
									this.setState({ isShowCustomizeModal: false })
								}
							>
								<RichText
									placeholder="eg. 2-2-2-2-2-2"
									onChange={value => {
										console.log(value);
									}}
									value={this.state.cutomizeColumn}
								/>
							</Modal>
						)}
					</div>
				</Fragment>
			);
		};

		// render the selected layout user choose
		renderSelectLayout = () => {
			const { attributes, setAttributes, className } = this.props;
			const { isShowCustomizeModal, layoutArray } = this.state;

			const template = [
				// [
				// 	'core/column',
				// 	{ className: 'large-4 medium-4 cell', style: 'color: red' },
				// 	[ [ 'core/paragraph', {} ] ],
				// ],
				// [
				// 	'core/column',
				// 	{ className: 'large-4 medium-4 cell' },
				// 	[ [ 'core/paragraph', {} ] ],
				// ],
				// [
				// 	'core/column',
				// 	{ className: 'large-4 medium-4 cell' },
				// 	[ [ 'core/paragraph', {} ] ],
				// ],
			];

			// const template = [
			// 	[
			// 		'core/column',
			// 		{ className: 'grid-x grid-padding-x' },
			// 		[
			// 			// [
			// 			// 	'core/column',
			// 			// 	{ className: 'large-4 medium-4 cell', style: 'color: red' },
			// 			// 	[ [ 'core/paragraph', {} ] ],
			// 			// ],
			// 			// [
			// 			// 	'core/column',
			// 			// 	{ className: 'large-4 medium-4 cell' },
			// 			// 	[ [ 'core/paragraph', {} ] ],
			// 			// ],
			// 			// [
			// 			// 	'core/column',
			// 			// 	{ className: 'large-4 medium-4 cell' },
			// 			// 	[ [ 'core/paragraph', {} ] ],
			// 			// ],
			// 		],
			// 	],
			// ];

			// for bk
			// let template = [
			// 	[
			// 		'core/columns',
			// 		{ className: 'grid-x grid-padding-x fl-selected-layout' },
			// 		[
			// 			// [
			// 			// 	'core/column',
			// 			// 	{ className: `large-${ 12 } medium-${ 12 } cell` },
			// 			// 	[ [ 'core/paragraph', { placeholder: 'abc' } ] ],
			// 			// ],
			// 			// [
			// 			// 	'core/column',
			// 			// 	{ className: `large-${ 12 } medium-${ 12 } cell` },
			// 			// 	[ [ 'core/paragraph', { placeholder: 'abc' } ] ],
			// 			// ],
			// 		],
			// 	],
			// ];

			// console.log( 'layoutArray', layoutArray );
			// console.log( 'template before', template );

			layoutArray.map((item, index) => {
				template.push([
					'futurelab/block-fl-block-flex-gird-column',
					{
						className: `large-${item} medium-${item} cell`,
						attributesTest: '123',
						width: `${item}`,
					},
					[['core/paragraph', { content: `Column${item}` }]],
				]);
			});

			// console.log( 'template after', template );

			return (
				<div className={className}>
					<div
						className="grid-x grid-padding-x fl-selected-layout"
					// style={{ backgroundColor: 'red' }}
					>
						<InnerBlocks
							template={template}
							allowedBlocks={['futurelab/block-fl-block-flex-gird-column']}
							// templateLock={true}
							renderAppender={() => null}
						/>
						{/* gutenberg not allow to have two InnerBlocks in same block
						the two InnerBlocks bind with same dataModal
						maybe wait for gutenberg update for now
						keep below for reference */}
						{/* {layoutArray.map( ( item, index ) => {
							console.log( 'item', item );
							return (
								<div
									key={index}
									className={`large-${ item } medium-${ item } cell`}
								>
									<div className="primary">
										<InnerBlocks
											template={[ [ 'core/paragraph', { content: 'column' } ] ]}
										/>
									</div>
								</div>
							);
						} )} */}
					</div>
				</div>
			);
		};

		render() {
			const { attributes, setAttributes, className } = this.props;
			const { layoutArray } = this.state;
			console.log('layoutArray', layoutArray);
			console.log('setAttributes', setAttributes);

			return layoutArray.length > 0 ?
				this.renderSelectLayout() :
				this.renderPlaceholder();
		}
	},

	save: ({ attributes, setAttributes }) => {
		const { layoutArray, layoutSelector } = attributes;
		console.log('layoutArray', layoutArray);
		console.log('setAttributes', setAttributes);
		console.log('layoutSelector', layoutSelector);
		return (
			<div
			// className={'grid-x grid-padding-x fl-selected-layout'}
			>
				<InnerBlocks.Content />
				{/* {layoutArray.map( ( item, index ) => {
						return (
							<div key={index} className={`large-${ item } medium-${ item } cell`}>
								<div className="primary">
									<InnerBlocks.Content />
								</div>
							</div>
						);
					} )} */}
			</div>
		);
	},
	useOnce: false,
	supports: {
		align: true,
		alignWide: true,
	},
});
