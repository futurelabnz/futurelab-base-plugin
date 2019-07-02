/* eslint-disable camelcase */

const { RichText, InspectorControls, InnerBlocks } = wp.editor;
export default ( { attributes, setAttributes } ) => {
	const { backgroundColor, imageUrl } = attributes;
	console.log( 'backgroundColor', backgroundColor );
	return (
		<div
			className={'fl-cover-image'}
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
			<div>
				<InnerBlocks.Content />
			</div>
		</div>
	);
};
