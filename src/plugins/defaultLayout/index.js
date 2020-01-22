/*
 * @Author: Hank
 * @Date: 2019-05-29 09:01:08
 * @Last Modified by: Hank
 * @Last Modified time: 2020-01-23 11:55:39
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { createBlock } = wp.blocks;
const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

import icons from './icons';
import './style.scss';
import SwitcherControls from './components/SwitcherControls';

// a selection of layouts. NOT FINISHED!
const LayoutSwitcher = () => {
	const layouts = {
		default: [createBlock('core/paragraph', {})],
		home: [
			createBlock('futurelab/block-fl-block-slider2', { align: 'full' }),
			createBlock('core/columns', { columns: 3 }),
			createBlock('futurelab/block-fl-content-carousel', { align: 'wide' }),
			createBlock('futurelab/block-layout-container', { align: 'wide' }),
			createBlock('futurelab/latest-news', { postLayout: 'grid', postsToShow: '3' }),
		],
		myteam: [
			createBlock('core/heading', { placeholder: 'Title here' }),
			createBlock('core/spacer', { height: '10' }),
			createBlock('core/paragraph', { placeholder: 'Content here' }),
			createBlock('core/heading', { placeholder: 'Title here' }),
			createBlock('core/spacer', { height: '10' }),
			createBlock('core/paragraph', { placeholder: 'Content here' }),
			createBlock('core/spacer', { height: '40' }),
			createBlock('core/heading', { content: 'Meet our team', level: 4 }),
			createBlock('futurelab/block-my-team-post-type', { align: 'wide' }),
		],
	};

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem target="layout-switcher">
				{__('Futurelab Default Layouts', '')}
			</PluginSidebarMoreMenuItem>
			<PluginSidebar name="layout-switcher" title={__('Futurelab Default Layouts', '')}>
				<SwitcherControls icons={icons} layouts={layouts} />
			</PluginSidebar>
		</Fragment>
	);
};

registerPlugin('layout-switcher', {
	icon: icons.switcher,
	render: LayoutSwitcher,
});
