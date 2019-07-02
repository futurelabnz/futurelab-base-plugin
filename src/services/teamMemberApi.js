/*
 * @Author: Hank
 * @Date: 2019-05-27 10:34:53
 * @Last Modified by: Hank
 * @Last Modified time: 2019-05-27 17:22:20
 */
const { apiFetch, apiRequest } = wp;

// export const fetchTeamMembers = body => {
// 	apiFetch( {
// 		path: 'wp/v2/team-members',
// 		method: 'GET',
// 		body: body,
// 	} )
// 		.then( fetchResult => {
// 			console.log( 'fetchResult', fetchResult );
// 			return fetchResult;
// 		} )
// 		.catch( error => {
// 			console.log( 'error', error );
// 		} );
// };

export const fetchTeamMembers = async body => {
	const fetchResult = await apiFetch( {
		path: 'wp/v2/team-members',
		method: 'GET',
		body: body,
	} );

	return fetchResult;
};
