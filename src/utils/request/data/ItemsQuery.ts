/**
 * @description 单件查询信息
 * @DataType Items
 */
import {doDataRequest} from "@utils/request/request";

class ItemsQuery{
    private static itemsListQuery(url:string,data:object):Promise<Result<{ItemsList:Array<any>,total:number}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url,data})
                const {data:ItemsList,count} = result
                resolve({Ok:true,ItemsList:ItemsList || [],total:count})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    static getNewlyIndexedItems(page:number = 1,limit:number = 20):Promise<Result<{ItemsList:Array<any>,total:number}>>{
        return ItemsQuery.itemsListQuery('/sku/list/newly/indexed',{limit,page})
    }
    static getItemsList(page:number = 1,limit:number = 20):Promise<Result<{ItemsList:Array<any>,total:number}>>{
        return ItemsQuery.itemsListQuery('/sku/list/all',{limit,page})
    }
    static getItemsListByKeyWord(page:number = 1,limit:number,keyword:string | null):Promise<Result<{ItemsList:Array<any>,total:number}>>{
        return ItemsQuery.itemsListQuery('/search/skus',{page,limit,keyword})
    }
}
export default ItemsQuery