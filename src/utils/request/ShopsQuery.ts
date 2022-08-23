import {doDataRequest} from "@utils/request/request";

class ShopsQuery{
    static getShopsList(page:number = 1,limit:number = 1):Promise<Result<{ShopsList:Array<any>,total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/shop/list/all',data:{limit,page}})
                const {data,count} = result
                resolve({Ok:true,ShopsList:data || [],total:count})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getShopStatisticsList():Promise<Result<{ShopsList:Array<any>}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:"/task/cache/shop/statics"})
                resolve({Ok:result.Ok,ShopsList:result.Data || []})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    // 获取检查图片结果
    static checkImageStatics():Promise<Result<{error_images:Array<any>}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:"/task/cache/image/statics"})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    //重新扫描图片数目
    static rescanImageNums():Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/task/pige/scan/images/num'})
                resolve({Ok:result.status === 'created'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    //统计各店铺数据
    static recountShopStatistics():Promise<Result<{status:string}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:"/task/pige/scan"})
                resolve({Ok:true,status:result.status})
            }catch (e){
                resolve({Ok: false})
            }
        })
    }
    //更新店铺水印
    static updateShopWatermark(shop_num:number):Promise<Result<{status:string}>>{
       return new Promise(async (resolve,reject) => {
           try {
               let result:any = await doDataRequest({url:'/task/shop/watermark',data:{shop_num,force:true}})
               resolve({Ok:true,status:result.status})
           }catch (e){
               resolve({Ok:false})
           }
       })
    }
    static revalidateImage():Promise<Result<{status:string}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:'/task/check/raw/image/size/valid'})
                resolve({Ok:true,status:result.status})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
}
export default ShopsQuery