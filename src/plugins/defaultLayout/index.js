/*
 * @Author: Hank
 * @Date: 2019-05-29 09:01:08
 * @Last Modified by: Hank
 * @Last Modified time: 2019-05-29 09:01:33
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
		default: [ createBlock( 'core/paragraph', {} ) ],
		hero: [
			createBlock( 'core/cover', { align: 'full' } ),
			createBlock( 'core/button', {
				text: __( 'Default Layouts', '' ),
				align: 'center',
			} ),
			createBlock( 'core/columns', { columns: 3 } ),
		],
		featured: [
			createBlock( 'core/heading', {} ),
			createBlock( 'core/spacer', { height: '10' } ),
			createBlock( 'core/media-text', { align: 'full' } ),
			createBlock( 'core/spacer', { height: '40' } ),
			createBlock( 'core/quote', {} ),
			createBlock( 'core/spacer', { height: '20' } ),
			createBlock( 'core/media-text', { mediaPosition: 'right' } ),
			createBlock( 'core/paragraph', {
				placeholder: __( 'Outro Text', '' ),
			} ),
		],
	};

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem target="layout-switcher">
				{__( 'Default Layouts', '' )}
			</PluginSidebarMoreMenuItem>
			<PluginSidebar name="layout-switcher" title={__( 'Default Layouts', '' )}>
				<SwitcherControls icons={icons} layouts={layouts} />
			</PluginSidebar>
		</Fragment>
	);
};

registerPlugin( 'layout-switcher', {
	icon: icons.switcher,
	render: LayoutSwitcher,
} );
