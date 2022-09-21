/**
 * @description 数据请求
 * @param url
 * @param data
 * @param method
 */
// const baseUrl = 'http://hk.watish.xyz:4381'
import axios from "axios";
interface RequestType{
	readonly url:string
	data?:any
	method?:'GET' | 'POST'
}

export const baseUrl = '/app'

export function doRequest({url,data = {},method = 'GET'}:RequestType){
	return new Promise(async (resolve,reject) => {
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

export function doDataRequest({url,data = {},method = 'GET'}:RequestType){
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
