/* eslint-disable camelcase */

const { InnerBlocks } = wp.editor;

const attributes = {
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
};

const layoutContainerSave = ( { attributes, setAttributes } ) => {
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
};

// Build deprecated list
const deprecated = [
	{
		attributes: attributes,
		save: layoutContainerSave,
	},
];

export default deprecated;
