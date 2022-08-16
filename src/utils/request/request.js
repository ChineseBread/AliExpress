import axios from "axios";
/**
 * @description 数据请求
 * @param url
 * @param data
 * @param method
 * @returns {Promise<unknown>}
 */
function doDataRequest({url,data = {},method = 'get'}){
	// data = getQueryData(data)
	return new Promise((resolve, reject) => {
		const dataObj = method === 'get' ? {params:data} : {data}
		axios.request({
			url:`http://hk.watish.xyz:4381/api${url}`,
			...dataObj,
			method,
			timeout:20000
		}).then(value => {
			resolve(value.data)
		},reason => {
			reject(reason)
		})

	})
}

export {doDataRequest}