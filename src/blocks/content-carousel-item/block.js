/**
 * BLOCK: my-test-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import './style.scss';
import './editor.scss';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {InnerBlocks} = wp.editor; //Import inner blocks from wp.editor

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType('futurelab/block-fl-content-carousel-item', {
    title: __('Futurelab carousel item'), // Block title.
    icon: 'format-gallery', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'common', // Block category
    keywords: [ //Keywords
        __('futurelab'),
        __('carousel'),
    ],
    attributes: { //Attributes
        currentSlide: {
            type: 'Number',
            default: 0,
        },
    },

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    edit({attributes, className, setAttributes}) {
        //Destructuring the images array attribute
        const {images = []} = attributes;
        let {currentClass} = 'swiper-slide';

        // This removes an image from the gallery
        const removeImage = (removeImage) => {
            //filter the images
            const newImages = images.filter((image) => {
                //If the current image is equal to removeImage the image will be returnd
                if (image.id != removeImage.id) {
                    return image;
                }
            });

            //Saves the new state
            setAttributes({
                images: newImages,
            });
        };

        const handleRightClick = (event) => {

            if (event === images.length) {
                setAttributes({
                    currentSlide: 0
                });
            } else {
                //Saves the new state
                setAttributes({
                    currentSlide: event + 1,
                });
            }

        }

        const handleLeftClick = (event) => {

            console.log(event);
            console.log(images.length);
            console.log(attributes.currentSlide);

            if (event === 0) {
                setAttributes({
                    currentSlide: images.length - 1,
                });
            } else {
                //Saves the new state
                setAttributes({
                    currentSlide: event - 1,
                });
            }

            console.log(attributes.currentSlide);

        }


        //JSX to return
        return (
            <div className={className}>
                <InnerBlocks/>
            </div>
        );

    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     */
    save({attributes}) {
        return (
            <div className="swiper-slide">
                <InnerBlocks.Content/>
            </div>
        );
    }
});