/*
 * @Author: Hank
 * @Date: 2019-05-27 10:34:53
 * @Last Modified by: Hank
 * @Last Modified time: 2019-05-30 20:48:06
 */
const { apiFetch, apiRequest } = wp;

export const fetchApi = async payload => {
	const { path, method, body } = payload;
	// console.log( path, method, body );
	try {
		const fetchResult = await apiFetch( {
			path: path,
			method: method,
		} );
		console.log( 'fetchResult', fetchResult );
		return fetchResult;
	} catch ( error ) {
		console.log( 'error', error );
	}
};
