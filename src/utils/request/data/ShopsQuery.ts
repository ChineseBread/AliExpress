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
}
export default ShopsQuery