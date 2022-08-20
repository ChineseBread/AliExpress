import {doDataRequest} from '@utils/request/request.js'
class StageOverviewQuery {
    private static getOverviewData(url:string):Promise<Result<{OverViewData:any}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url:`/console${url}`})
                resolve({Ok:result.Ok,Msg:result.Msg, OverViewData:result.Data || {}})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    //店铺数据预览
    static getShopsOverview():Promise<Result<{OverViewData:any}>>{
        return this.getOverviewData('/shop/overview')
    }
    //停更数据预览
    static getTapinatorOverview():Promise<Result<{OverViewData:any}>>{
        return this.getOverviewData('/error/overview')
    }
    static getGoodsOverview():Promise<Result<{OverViewData:any}>>{
        return this.getOverviewData('/goods/overview')
    }
    static getItemsOverview():Promise<Result<{OverViewData:any}>>{
        return this.getOverviewData('/sku/overview')
    }
}
export default StageOverviewQuery