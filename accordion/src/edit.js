/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

// import Inspector from './components/inspector'
// import Accordion from './components/accordion'

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks, RichText, AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import Inspector from './components/inspector';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
    return (
        // Show the block alignment controls on focus
        <>
            {/* // Show the block alignment controls on focus */}
            <BlockControls key='controls'>
                <AlignmentToolbar
                    value={props.attributes.accordionAlignment}
                    onChange={(value) => props.setAttributes({ accordionAlignment: value })}
                />
            </BlockControls>
            {/* // Show the block controls on focus */}
            <Inspector {...props} />
            {/* // Show the button markup in the editor */}
            <div
                {...useBlockProps({
                    className: props.attributes.accordionAlignment
                        ? 'fl-align-' + props.attributes.accordionAlignment
                        : undefined,
                })}
            >
                <RichText
                    tagName='div'
                    multiline='p'
                    placeholder='Accordion Title'
                    value={props.attributes.accordionTitle}
                    className='fl-accordion-title'
                    onChange={(value) => props.setAttributes({ accordionTitle: value })}
                />

                <div className='fl-accordion-text'>
                    <InnerBlocks />
                </div>
            </div>
        </>
    );
}
