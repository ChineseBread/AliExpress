//表单页查询
import {doDataRequest} from "@utils/request/request";
import {Result} from "antd";

class FormQuery {
    //获取商店的编号
    static getShopId(): Promise<Result<{ ShopIds: Array<any> }>> {
        return new Promise(async (resolve, reject) => {
            try {
                let result: any = await doDataRequest({url: '/upload_chart/shop/list'})
                resolve({Ok: true, ShopIds: result.data || []})
            } catch (e) {
                resolve({Ok: false})
            }
        })
    }

    //前置表格数据获取
    static getTablePrevList(formData: object): Promise<Result<{ prevTableData: Array<any> }>> {
        return new Promise(async (resolve, reject) => {
            try {
                let result: any = await doDataRequest({url: '/upload_chart/test/prev/list/v2', data: {...formData}})
                resolve({Ok:result.Ok, prevTableData: result.Data || []})
            } catch (e) {
                resolve({Ok: false})
            }
        })
    }

    static getCarriageTemplate(page:number = 1,limit:number = 20,shop_num: number,keyword:string = ''): Promise<Result<{ Templates: Array<any>,total:number}>> {
        return new Promise(async (resolve, reject) => {
            try {
                let result:any = await doDataRequest({url:'/upload_chart/search/shipping/template',data:{page,limit,shop_num,keyword}})
                resolve({Ok:true,Templates:result.data || [],total:result.count || 0})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    //根据型号筛选图片
    static getImageListByModal(shop_num:number,type_code:string,limit:number = 12,page:number = 1):Promise<Result<{ImageList:Array<any>,total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/upload_chart/list/series/by/tag/shop',data:{shop_num,type_code,limit,page}})
                resolve({Ok:true,ImageList:result.data || [],total:result.count || 0})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static searchItemModal(data:any):Promise<Result<{ModalGroups:Array<any>,total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/upload_chart/search/tags',data})
                resolve({Ok:true,ModalGroups:result.Data || [],total:result.Total || 0})
            }catch (e){
                resolve({Ok:false,Msg:'请求超时'})
            }
        })
    }
    static regenerateRowData(shop_num:number = 1):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/upload_chart/remake/by/sku1/sku6',data:{shop_num}})
                resolve({Ok:result.Ok,Data:result.Data})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static uploadData(data:Array<any>):Promise<Result<{uuid:string}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/upload_chart/make/excel',data,method:'post'})
                resolve({Ok:result.Ok,Msg:result.Msg,uuid:result.UUID || ''})
            }catch (e){
                resolve({Ok:false,Msg:'请求超时'})
            }
        })
    }
    static downExcel(uuid:string | undefined):string{
        return `http://server.watish.xyz:4381/api/upload_chart/download/excel/by/uuid?uuid=${uuid}`
    }
}
export default FormQuery