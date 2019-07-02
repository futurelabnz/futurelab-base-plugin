const { __ } = wp.i18n;
const { addFilter } = wp.hooks;

addFilter(
	'blocks.registerBlockType',
	'futurelab-block-base/extending-register-block-type',
	extendWithRegisterBlockType
);

function extendWithRegisterBlockType( settings, name ) {
	// Check for block type
	if ( 'core/code' === name ) {
		// Change the block title
		settings.title = __( 'Code Snippet', 'futurelab-block-base' );

		// Change the block description
		settings.description = __(
			'Use for maximum codiness ðŸ’ƒ',
			'futurelab-block-base'
		);

		// Change block category
		settings.category = 'recommended';

		// Change block icon
		settings.icon = 'admin-tools';

		// Change keywords
		if ( settings.keywords ) {
			settings.keywords.push( __( 'ðŸ’»', 'futurelab-block-base' ) );
		} else {
			settings.keywords = [ __( 'ðŸ’»', 'futurelab-block-base' ) ];
		}

		// Change supports
		settings.supports = Object.assign( {}, settings.supports, {
			html: true,
			anchor: true,
		} );

		// Edit attributes
		settings.attributes.new = {
			type: 'string',
			default: 'Default text',
		};

		settings.edit = props => {
			console.log( 'props', props );
			return <div>Override</div>;
		};
		settings.save = props => <p>NOPE</p>;
	}
	return settings;
}
