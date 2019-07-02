/* eslint-disable camelcase */
export default ( { attributes, setAttributes } ) => {
	const { teamMembers } = attributes;

	const renderTeamMember = teamMembers => {
		return (
			<div className="grid-x grid-padding-x small-up-1 medium-up-2 large-up-3">
				{teamMembers.map( ( teamMember, index ) => {
					const {
						id,
						title: { rendered: titleRendered },
						content: { rendered: contentRendered },
						fl_team_position,
						fl_team_email,
						fl_team_linkedin,
						fl_team_facebook,
						fl_team_twitter,
						fl_team_instagram,
						featured_media,
						teamMemberImage,
					} = teamMember;
					const contentHTML = { __html: contentRendered };
					return (
						<div key={`${ index }${ id }`} className={'cell'}>
							<img
								src={teamMemberImage.img_src}
								srcSet={teamMemberImage.img_srcset}
								alt=""
							/>
							<div>{titleRendered}</div>
							<div>{fl_team_position}</div>
							<div dangerouslySetInnerHTML={contentHTML} />
							{/* <div className="grid-x grid-margin-x">
								{fl_team_facebook[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_facebook }`}>
											<i className={'fab fa-facebook'} />
										</a>
									</div>
								)}
								{fl_team_twitter[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_twitter }`}>
											<i className={'fab fa-twitter'} />
										</a>
									</div>
								)}
								{fl_team_instagram[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_instagram }`}>
											<i className={'fab fa-instagram'} />
										</a>
									</div>
								)}
								{fl_team_linkedin[ 0 ] && (
									<div className="cell auto social_icon_container">
										<a href={`${ fl_team_linkedin }`}>
											<i className={'fab fa-linkedin'} />
										</a>
									</div>
								)}
							</div> */}
						</div>
					);
				} )}
			</div>
		);
	};
	console.log( 'teamMembers in render', teamMembers );

	return (
		<div className={'grid-container full'}>{renderTeamMember( teamMembers )}</div>
		// <div>123123</div>
	);
};
