import axios from "axios";
/**
 * @description 数据请求
 * @param url
 * @param data
 * @param method
 */
// const baseUrl = 'http://hk.watish.xyz:4381'
const baseUrl = '/app'
function doDataRequest({url,data = {},method = 'GET'}){
	return new Promise((resolve, reject) => {
		const dataObj = method.toUpperCase() === 'GET' ? {params:data} : {data}
		axios.request({
			url:`${baseUrl}/api${url}`,
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

export {doDataRequest,baseUrl}