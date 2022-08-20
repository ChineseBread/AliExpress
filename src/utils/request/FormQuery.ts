//表单页查询
import {doDataRequest} from "@utils/request/request";
import {Result} from "antd";
import PrevTableFormDataStorage from "@utils/PrevTableFormDataStorage";

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
    static getTablePrevList(formData: PrevTableForm): Promise<Result<{ PrevTableData: Array<any> , RandomTitles:Array<any>}>> {
        return new Promise(async (resolve, reject) => {
            try {
                let result: any = await doDataRequest({url: '/upload_chart/test/prev/list/v2', data: {...formData}})
                if(result.Ok){
                    let RandomTitlesResult:any = await this.getRandomTitle('',result.Data.length || 0)
                    if (RandomTitlesResult.Ok){
                        resolve({Ok:true,PrevTableData: result.Data || [],RandomTitles : RandomTitlesResult.RandomTitle || []})
                    }
                }else{
                    resolve({Ok:false})
                }
            } catch (e) {
                resolve({Ok: false})
            }
        })
    }
    //运费模板
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
    static getImageListByModal(shop_num:number,type_code:string,limit:number = 36,page:number = 1):Promise<Result<{ImageList:Array<any>,total:number}>>{
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
    static regenerateRowData(tag:string,series_num:number,shop_num:number,index:number):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                const data = {...{series_num,shop_num},...(index === 0 ? {sku1:tag} : {sku5:tag})}
                // const {shop_num,series_num}:PrevTableForm = PrevTableFormDataStorage.getPrevFormData()
                let result:any = await doDataRequest({url:'/upload_chart/remake/by/sku1/sku6',data})
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
    static getRandomTitle(cate:string,limit:number = 1):Promise<Result<{RandomTitle:Array<any>}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/upload_chart/random/title',data:{cate,limit}})
                resolve({Ok:result.Ok || true,RandomTitle:result.Data || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getTitleTemplate():Promise<Result<{TitleTemplate:Array<any>}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/upload_chart/all/title'})
                resolve({Ok:result.Ok || true,TitleTemplate:result || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static downExcel(uuid:string | undefined):string{
        return `http://server.watish.xyz:4381/api/upload_chart/download/excel/by/uuid?uuid=${uuid}`
    }

}
export default FormQuery