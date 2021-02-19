/*
 * @Author: Hank
 * @Date: 2019-08-23 14:07:43
 * @Last Modified by: Hank
 * @Last Modified time: 2019-09-03 12:08:13
 */

/**
 * Inspector Controls Copied from my old accrodion block
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const { InspectorControls } = wp.blockEditor;

// Import Inspector components
const { PanelBody, RangeControl, ToggleControl } = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
    constructor(props) {
        super(...arguments);
    }

    render() {
        return (
            <InspectorControls key='inspector'>
                <PanelBody>
                    <ToggleControl
                        label={__('Open by default')}
                        checked={this.props.attributes.accordionOpen}
                        onChange={() =>
                            this.props.setAttributes({
                                accordionOpen: !this.props.attributes.accordionOpen,
                            })
                        }
                    />
                </PanelBody>
            </InspectorControls>
        );
    }
}
