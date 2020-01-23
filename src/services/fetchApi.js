/*
 * @Author: Hank
 * @Date: 2019-05-27 10:34:53
 * @Last Modified by: Hank
 * @Last Modified time: 2020-01-23 12:30:55
 */
const { apiFetch, apiRequest } = wp;

export const fetchApi = async payload => {
	const { path, method, body } = payload;
	try {
		const fetchResult = await apiFetch({
			path: path,
			method: method,
		});
		return fetchResult;
	} catch (error) {
	}
};
