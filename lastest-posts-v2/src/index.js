import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';

registerBlockType('futurelab-base-plugin/latest-posts-flv2', {
    /**
	 * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
	 */
	apiVersion: 2,
    title: __('latest-posts-flv2', 'futurelab-base-plugin'),
    icon: 'wordpress',
    category: 'layout',
    example: {},
	edit: Edit,
    supports: {
		align: true,
		alignWide: true,
	},
});
