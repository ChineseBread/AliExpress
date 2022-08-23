import axios from "axios";
/**
 * @description 数据请求
 * @param url
 * @param data
 * @param method
 */
function doDataRequest({url,data = {},method = 'GET'}){
	return new Promise((resolve, reject) => {
		const dataObj = method.toUpperCase() === 'GET' ? {params:data} : {data}
		axios.request({
			url:`/app/api${url}`,
			// url:`http://hk.watish.xyz:4381/api${url}`,
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