/*
 * @Author: Hank
 * @Date: 2019-05-17 11:21:44
 * @Last Modified by: Hank
 * @Last Modified time: 2019-05-20 09:45:07
 */
/* eslint-disable prefer-const */
/* eslint-disable no-console */

// NOT FINISH BUIDLING THIS BLOCK
// Decided to switch to us iframe google map

//  Import CSS.
import './style.scss';
import './editor.scss';
const {
	Button,
	Modal,
	Placeholder,
	PanelBody,
	PanelRow,
	TextControl,
} = wp.components;
const { RichText, InnerBlocks, BlockControls, InspectorControls } = wp.editor;
const { Component, Fragment } = wp.element;

//  Import components.
import Map from './components/Map';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

// TODO: fix admin editor display innerblock grid issue
registerBlockType( 'futurelab/block-fl-block-google-map', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'fl google map' ), // Block title.
	description: __( 'futurelab google map' ), // Block description.
	icon: {
		background: 'rgba(225, 225, 225, 0.25)',
		src: 'wordpress-alt',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'fl-Blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'futurelab slider block' ) ],

	attributes: {
		apiKeySelector: {
			type: 'string',
			source: 'attribute',
			attribute: 'data-apikey',
			selector: '.fl-google-map',
		},
	},
	// Made edit as a class component for react lifecycle(componentDidMount)
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
			this.state = {
				apiKey: '', // the layout user select
			};
		}
		// component finish loading
		componentDidMount() {
			const { attributes, setAttributes, className } = this.props;
			const { apiKeySelector } = attributes;
			this.setState( { apiKey: apiKeySelector } );
		}

		render() {
			const { attributes, setAttributes, className } = this.props;
			const { apiKeySelector } = attributes;
			const { apiKey } = this.state;
			return (
				<Fragment>
					<InspectorControls>
						<PanelBody title={__( 'Map Settings' )} initialOpen={true}>
							<PanelRow>
								<p>{__( 'Enter google Api Key below' )}</p>
								<TextControl
									lable={'ApiKey'}
									value={apiKey}
									onChange={value => {
										this.setState( { apiKey: value } );
									}}
								/>
								<RichText />
							</PanelRow>
						</PanelBody>
					</InspectorControls>
					<div>
						<Map
							isMarkerShown
							// googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNN9sZbT9qrzBC3ShoByB3NLhOEMLlHcA&v=3.exp&libraries=geometry,drawing,places"
							googleMapURL="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places"
							loadingElement={<div style={{ height: '100%' }} />}
							containerElement={<div style={{ height: '400px' }} />}
							mapElement={<div style={{ height: '100%' }} />}
						/>
					</div>
				</Fragment>
			);
		}
	},

	save: ( { attributes } ) => {
		return (
			<div
				className="fl-google-map"
				data-apikey={'AIzaSyDNN9sZbT9qrzBC3ShoByB3NLhOEMLlHcA'}
			/>
		);
	},
	useOnce: false,
	supports: {
		align: true,
		alignWide: true,
		customClassName: false,
	},
} );
