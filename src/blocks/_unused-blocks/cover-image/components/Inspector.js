/*
 * @Author: Hank
 * @Date: 2019-06-11 12:59:24
 * @Last Modified by:   Hank
 * @Last Modified time: 2019-06-11 12:59:24
 */

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	InspectorControls,
	PanelColorSettings,
	MediaUpload,
	MediaUploadCheck,
} = wp.editor;

const { PanelBody, PanelRow, Button } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
	constructor() {
		super( ...arguments );
	}

	// select Image handler for change Image and Add new Image
	selectImageHandler = imageObject => {
		const {
			attributes: { backgroundColor, imageUrl },
			setAttributes,
		} = this.props;
		const image = imageObject.sizes.full.url;
		console.log( 'image', image );
		setAttributes( { imageUrl: image } );
	};

	render() {
		const {
			attributes: { backgroundColor, imageUrl },
			setAttributes,
		} = this.props;

		return (
			<InspectorControls>
				<PanelBody title={__( 'Select Background Color' )} initialOpen={false}>
					<PanelRow>
						<PanelColorSettings
							title={__( 'Color Settings' )}
							colorSettings={[
								{
									value: backgroundColor,
									onChange: value => {
										setAttributes( { backgroundColor: value } );
									},
									label: __( 'Background Color' ),
								},
							]}
						/>
					</PanelRow>
				</PanelBody>

				<PanelBody>
					<h3>{__( 'Select Background Image' )}</h3>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={imageObject => {
								this.selectImageHandler( imageObject );
							}}
							type="image"
							value={imageUrl}
							render={( { open } ) => {
								return imageUrl ? (
									// <Button onClick={open}>{imageUrl}</Button>
									<Button onClick={open}>Change Background Image</Button>
								) : (
									<div>
										<Button isDefault className="image-button" onClick={open}>
											Choose Image
										</Button>
									</div>
								);
							}}
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>
		);
	}
}
