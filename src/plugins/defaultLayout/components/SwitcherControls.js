const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { Button, Icon, PanelBody, PanelRow } = wp.components;
const { withSelect, dispatch } = wp.data;

import SwitcherButton from './SwitcherButton';
import ResetControls from './ResetControls';

const SwitcherControls = ({ blocks, icons, layouts }) => {
	const blockIds = blocks.map(block => block.clientId);
	return (
		<Fragment>
			<PanelBody title={__('Page Layouts', '')} opened>
				<PanelRow className="layout-switcher">
					<SwitcherButton
						label={__('Home', '')}
						blockIds={blockIds}
						layout={layouts.home}
					/>
					<SwitcherButton
						label={__('My Team', '')}
						blockIds={blockIds}
						layout={layouts.myteam}
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody title={__('Reset Layout', '')}>
				<PanelRow>
					<ResetControls layout={layouts.default} />
				</PanelRow>
			</PanelBody>
		</Fragment>
	);
};
export default withSelect(select => {
	return {
		blocks: select('core/editor').getBlocks(),
	};
})(SwitcherControls);
