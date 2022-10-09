/**
 * @description 爆品查询
 */
import {doDataRequest, doRequest} from "@utils/request/request";

class HotQuery{

    // static getHotGroupByDate<T>(hots_id:HotGroup['hots_id'],end_date:string,start_date?:string):Promise<Result<{SalesList:T}>>{
    //     return new Promise(async (resolve,reject) => {
    //         try {
    //             let result:any = await doDataRequest({url: '/hots/filter',data:{hots_id,end_date,start_date}})
    //             resolve({Ok:result.Ok,SalesList:result.Data})
    //         }catch (e){
    //             resolve({Ok:false})
    //         }
    //     })
    // }

    /**
     * @desc 列出爆品组列表
     * @param page
     * @param limit
     */
    static getHotGroups(page:number = 1,limit:number = 20):Promise<Result<{HotGroups:HotGroup[],total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/list/all',data:{limit,page}})
                resolve({Ok:true,HotGroups:result.data,total:result.count})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 创建爆品组
     */
    static createHotGroup(data:object):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doRequest({url:'/hots/create',data})
                resolve({Ok:result.Ok,Msg:result.Msg || '创建失败'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getSalesIncrementInWeek<T>(hots_id:HotGroup['hots_id'],start_date:string,end_date:string):Promise<Result<{IncrementData:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/v2/goods/incr/data/by/date',data:{hots_id,end_date,start_date}})
                resolve({Ok:result.Ok,IncrementData:result.Data})
            }catch (e){
                resolve({Ok:false,Msg:'设置失败'})
            }
        })
    }
    private static doSetItem(url:string,hots_id:HotGroup['hots_id'],item_id:HotItem['item_id'],start_date:string = ''):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doRequest({url,data:{hots_id,item_id,start_date}})
                resolve({Ok:result.Ok,Msg:result.Msg || '设置失败'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static setItemAsMajorHotItem(hots_id:HotGroup['hots_id'],item_id:HotItem['item_id'],start_date:string):Promise<Result<any>>{
        return this.doSetItem('/hots/set/main/hot',hots_id,item_id,start_date)
    }

    static setItemAsMajorCompeteItem(hots_id:HotGroup['hots_id'],item_id:HotItem['item_id'],start_date:string):Promise<Result<any>>{
        return this.doSetItem('/hots/set/primary/good',hots_id,item_id,start_date)
    }

    static setItemAsSecondaryHotItem(hots_id:HotGroup['hots_id'],item_id:HotItem['item_id'],start_date:string):Promise<Result<any>>{
        return this.doSetItem('/hots/set/primary/hot',hots_id,item_id,start_date)
    }

    static setItemAsSecondaryCompeteItem(hots_id:HotGroup['hots_id'],item_id:HotItem['item_id'],start_date:string):Promise<Result<any>>{
        return this.doSetItem('/hots/set/second/good',hots_id,item_id,start_date)
    }

    static getCombineHotGroupDataById<T>(hots_id:HotGroup['hots_id']):Promise<Result<{DataList:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:"/hots/v2/goods/detail/by/hot",data:{hots_id}})
                resolve({Ok:result?.Ok,DataList:result.Data || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getItemAnalyzeData<T>(item_id:HotItem['item_id']):Promise<Result<{AnalyzeData:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/v2/skus/analysis',data:{item_id}})
                resolve({Ok:result.Ok,AnalyzeData:result.Data})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    private static doItemAnalyzeAction(url:string,item_id:HotItem['item_id'],sku_id:HotGroupItemSku['sku_id']):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                // do action
                let result:any = await doRequest({url,data:{item_id,sku_id}})
                resolve({Ok:result.Ok,Msg:result.Msg})
            }catch (e){
                resolve({Ok:false,Msg:'设置失败'})
            }
        })
    }
    //设为首图单品
    static setAsFirstImageItem(item_id:HotItem['item_id'],sku_id:HotGroupItemSku['sku_id']):Promise<Result<any>>{
        return this.doItemAnalyzeAction('/hots/v2/skus/set/primary',item_id,sku_id)
    }
    //设为相同单品
    static setAsSameItem(item_id:HotItem['item_id'],sku_id:HotGroupItemSku['sku_id']):Promise<Result<any>>{
        return this.doItemAnalyzeAction('/hots/v2/skus/set/normal',item_id,sku_id)
    }
    static getGoodsShippingByDate<T>(hots_id:HotGroup['hots_id'],start_date:string,end_date:string):Promise<Result<{ShippingList:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/v2/goods/shipping/data/by/date',data:{hots_id,start_date,end_date}})
                resolve({Ok:result.Ok,ShippingList:result.Data || []})
            }catch (e){
                resolve({Ok:false})
            }

        })
    }

    static setGoodStartDate(item_id:HotItem['item_id'],start_date:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doRequest({url:'/hots/v2/goods/set/start_date',data:{item_id,start_date}})
                resolve({Ok:result.Ok,Msg:result.Msg})
            }catch (e){
                resolve({Ok:false,Msg:'设置失败'})
            }
        })
    }
}
export default HotQuery