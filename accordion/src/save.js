/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks, RichText, AlignmentToolbar, BlockControls } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
    const { accordionOpen } = props.attributes;
    return (
        <div {...useBlockProps.save()}>
            <button className={`fl-accordion fl-accordion-title ${accordionOpen ? 'active' : ''}`}>
                <RichText.Content value={props.attributes.accordionTitle} />
            </button>
            <div className={`fl-accordion fl-accordion-panel ${accordionOpen ? 'active' : ''}`}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
}
