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
import save from './save';

const blockAttributes = {
	accordionTitle: {
		type: 'array',
		selector: '.fl-accordion-title',
		source: 'children',
	},
	accordionText: {
		type: 'array',
		selector: '.fl-accordion-text',
		source: 'children',
	},
	accordionOpen: {
		type: 'boolean',
		default: false,
	},
    accordionAlignment: {
		type: 'string',
	},
};

registerBlockType('futurelab-base-plugin/accordion', {
    /**
     * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
     */
    apiVersion: 2,
    title: __('Accordion', 'futurelab-base-plugin'),
    icon: 'wordpress',
    category: 'layout',
    example: {},
    attributes: blockAttributes,
    edit: Edit,
    save,
    supports: {
        align: true,
        alignWide: true,
    },
});
