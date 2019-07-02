const { addFilter } = wp.hooks;

import classnames from 'classnames';

addFilter(
	'blocks.getBlockDefaultClassName',
	'futurelab/custom-cover-block-class-name',
	customCoverClassName
);

function customCoverClassName( className, name ) {
	if ( 'futurelab/block-fl-block-flex-gird' === name ) {
		// This will OVERRIDE the class
		// return "my-block-cover";
		// Add a custom class of your own
		return classnames( className, 'my-block-cover' );
	}

	return className;
}
