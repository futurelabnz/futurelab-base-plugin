const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { Button, Icon, PanelBody, PanelRow } = wp.components;
const { withSelect, dispatch } = wp.data;

import SwitcherButton from './SwitcherButton';
import ResetControls from './ResetControls';

const SwitcherControls = ( { blocks, icons, layouts } ) => {
	const blockIds = blocks.map( block => block.clientId );
	return (
		<Fragment>
			<PanelBody title={__( 'Default Layouts', '' )} opened>
				<PanelRow className="layout-switcher">
					<SwitcherButton
						label={__( 'Layout 1', '' )}
						icon={icons.hero}
						blockIds={blockIds}
						layout={layouts.hero}
					/>
					<SwitcherButton
						label={__( 'Layout 2', '' )}
						icon={icons.featured}
						blockIds={blockIds}
						layout={layouts.featured}
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody title={__( 'Reset Layout', '' )}>
				<PanelRow>
					<ResetControls layout={layouts.default} />
				</PanelRow>
			</PanelBody>
		</Fragment>
	);
};
export default withSelect( select => {
	return {
		blocks: select( 'core/editor' ).getBlocks(),
	};
} )( SwitcherControls );
