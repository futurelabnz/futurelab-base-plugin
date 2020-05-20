/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */

import { fetchApi } from '../../services/fetchApi';
const { withSelect } = wp.data;
const { compose, withState } = wp.compose;
const { Component, Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, PanelRow, TextControl, Button, SelectControl } = wp.components;

import { rightArrowIcon } from './icons';

export default class extends Component {
	constructor(props) {

		super(...arguments);
		this.props = props;
		this.state = {
			postType: '',
			path: 'team-members',
			posts: '',
			teamsOptions: [],
			selectedTaxonomy: '',
		};
	}
	// component finish loading
	async componentDidMount() {
		// get options for dropdown in InspectorControls
		const fl_teams_options = await fetchApi({
			path: '/wp/v2/fl_teams',
			method: 'GET',
			body: '',
		});

		let teamsOptions = {}

		if (Array.isArray(fl_teams_options)) {
			teamsOptions = Array.from(fl_teams_options.map((item, index) => {
				console.log('teamsOptions: ', teamsOptions);
				return {
					value: item.id,
					label: item.name,
				};
			}));
		} else {
			teamsOptions = {
				value: '',
				label: '',
			}
		}



		this.setState({ teamsOptions: teamsOptions });
		const { path } = this.state;
		const { selectedTaxonomy } = this.props.attributes;
		const fetchTeamMembers = await fetchApi({
			path: selectedTaxonomy ? `wp/v2/${path}?fl_teams=${selectedTaxonomy}` : `wp/v2/${path}`,
			method: 'GET',
			body: '',
		});



		this.setState({ posts: fetchTeamMembers });
	}

	// loop teamMembers Array, render teamMember
	renderTeamMember = teamMembers => {
		return (
			<div className="grid-x grid-padding-x small-up-1 medium-up-2 large-up-3">
				{teamMembers.map((teamMember, index) => {
					const {
						id,
						title: { rendered: titleRendered },
						content: { rendered: contentRendered },
						fl_team_position = [],
						fl_team_email = [],
						fl_team_linkedin = [],
						fl_team_facebook = [],
						fl_team_twitter = [],
						fl_team_instagram = [],
						teamMemberImage = [],
					} = teamMember;
					const contentHTML = { __html: contentRendered };

					// 

					return (
						<div key={`${index}${id}`} className={'cell'}>
							<img
								src={teamMemberImage ? teamMemberImage.img_src : ''}
								srcSet={teamMemberImage ? teamMemberImage.img_srcset : ''}
								alt=""
							/>
							{/* <div
								className="icon-container"
							>
								{rightArrowIcon}
							</div> */}
							<div>{titleRendered}</div>
							<div>{fl_team_position}</div>
							<div dangerouslySetInnerHTML={contentHTML} />
							{/* <div className="grid-x grid-margin-x">
								{fl_team_facebook[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_facebook }`}>
											<i className={'fa fa-facebook'} />
										</a>
									</div>
								)}
								{fl_team_twitter[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_twitter }`}>
											<i className={'fa fa-twitter'} />
										</a>
									</div>
								)}
								{fl_team_instagram[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_instagram }`}>
											<i className={'fa fa-instagram'} />
										</a>
									</div>
								)}
								{fl_team_linkedin[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_linkedin }`}>
											<i className={'fa fa-linkedin'} />
										</a>
									</div>
								)}
							</div> */}
						</div>
					);
				})}
			</div>
		);
	};

	selectOnChangeHandler = async (value) => {
		this.setState({ selectedTaxonomy: value });
		this.props.setAttributes({ selectedTaxonomy: value });
		const { attributes, setAttributes } = this.props;
		const { path } = this.state;
		const fetchResult = await fetchApi({
			path: `wp/v2/${path}?fl_teams=${value}`,
			method: 'GET',
			body: '',
		});

		this.setState({ posts: fetchResult });

		let postType = '';

		if (path === 'posts') {
			postType = 'post';
		} else if (path === 'team-members') {
			postType = 'fl_team_member';
		}

		setAttributes({ postType: postType });

		// initHighCharts(value);
	};

	render() {
		const { attributes, setAttributes, className } = this.props;
		const { postType, selectedTaxonomy } = attributes;
		const { posts, path, teamsOptions } = this.state;
		if (!posts) {
			return <div>Loading...</div>;
		}
		return [
			<InspectorControls>
				<PanelBody
					className={'block-social-links'}
					title="team block"
					initialOpen={true}
				>
					<PanelRow>Enter the post type you want to show.</PanelRow>

					<SelectControl
						label={__('Select a taxonomy:')}
						value={selectedTaxonomy} // e.g: value = [ 'a', 'c' ]
						onChange={this.selectOnChangeHandler}
						options={[
							{ value: null, label: 'Select a taxonomy' },
							...teamsOptions,
						]}
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={`${className}`}>
				<div className={'grid-container full'}>
					{this.renderTeamMember(posts)}
				</div>
			</div>,
		];
	}
}
