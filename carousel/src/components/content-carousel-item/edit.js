/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
    return (
        <div {...useBlockProps()}>
                <InnerBlocks />
        </div>
    );
}
