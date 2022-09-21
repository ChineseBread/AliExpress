/**
 * @description 爆品查询
 */
import {doDataRequest, doRequest} from "@utils/request/request";

class HotQuery{

    static getHotGroupByDate<T>(hots_id:HotGroup['hots_id'],end_date:string,start_date?:string):Promise<Result<{SalesList:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url: '/hots/filter',data:{hots_id,end_date,start_date}})
                resolve({Ok:result.Ok,SalesList:result.Data})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @desc 列出爆品组列表
     * @param page
     * @param limit
     */
    static getHotGroups(page:number = 1,limit:number = 20):Promise<Result<{HotGroups:Array<HotGroup>,total:number}>>{
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

    static getHotGroupInfo<T,P>(hots_id:HotGroup['hots_id']):Promise<Result<{GroupInfo:T,HotItemInfo:P}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/detail',data:{hots_id}})
                resolve({Ok:result.Ok,GroupInfo:result.Info,HotItemInfo:result.Data})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getHotGroupItemList<T>(hots_id:HotGroup['hots_id']):Promise<Result<{ItemList:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/skus/latest',data:{hots_id}})
                resolve({Ok:Object.hasOwn(result,'HotsId'),ItemList:result.Data || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getHotGroupShopInfoList<T>(hots_id:HotGroup["hots_id"]):Promise<Result<{ShopInfoList:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/list/store',data:{hots_id}})
                resolve({Ok:result.Ok,ShopInfoList:result.Data})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getHotGroupFreight<T>(hots_id:HotGroup['hots_id']):Promise<Result<{FreightList:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/list/shipping',data:{hots_id}})
                if (!result.Ok) resolve({Ok:false})
                let FreightList = result.Data
                let images:string[][] = await Promise.all(FreightList.map(({item_id}:any) => this.getGoodImages(item_id)))
                resolve({Ok:result,FreightList:FreightList.map((freight:any,index:number) => ({...freight,image:images[index][0] || ''}))})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getSalesIncrementInWeek<T>(hots_id:HotGroup['hots_id']):Promise<Result<{IncrementData:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/sales/daily',data:{hots_id}})
                resolve({Ok:result.Ok,IncrementData:result.Data})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static setItemAsHotItem(hots_id:HotGroup['hots_id'],item_id:HotItem['item_id']):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doRequest({url:'/hots/set/main/good',data:{hots_id,item_id}})
                resolve({Ok:result.Ok,Msg:result.Msg || '设置失败'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static setItemAsCompeteItem(hots_id:HotGroup['hots_id'],item_id:HotItem['item_id']):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result: any = await doRequest({url: '/hots/set/primary/good', data: {hots_id, item_id}})
                resolve({Ok:result.Ok,Msg:result.Msg || '设置失败'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    static getGoodDetail<T>(item_id:string):Promise<Result<{GoodDetail:T}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/good/detail',data:{item_id}})
                resolve({Ok:result.Ok,GoodDetail:result.Data})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    // 商品详情页需要获取图片数据 不暴露该方法
    private static getGoodImages(item_id:string):Promise<string[]>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/hots/good/images',data:{item_id}})
                resolve(result)
            }catch (e){
                resolve([])
            }
        })
    }
}
export default HotQuery