/**
 * @description 可查询的数据
 * @Datatype goods
 */
import {doDataRequest} from "@utils/request/request";
import {Dayjs} from "dayjs";
type GoodsListResult = Result<{GoodsList:Array<any>,total:number}>
class GoodsQuery {
    private static goodsQuery(url:string,data:object):Promise<GoodsListResult>{
        return new Promise(async (resolve,reject) => {
            try {
                let result:any = await doDataRequest({url,data})
                const {data:GoodsList,count} = result
                resolve({Ok:true,GoodsList:GoodsList || [],total:count})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }
    //获取新导入商品
    static getNewlyIndexedGoods(page:number = 1,limit:number = 20):Promise<GoodsListResult>{
        return this.goodsQuery('/goods/list/newly/indexed',{page,limit})
    }
    //获取疑似断更商品
    static getSuspectedTapinatorGoods(page:number = 1,limit:number = 20):Promise<GoodsListResult>{
        return this.goodsQuery('/goods/list/suspect/error',{page,limit})
    }
    static getNewestGoodsList(page:number = 1,limit:number = 20):Promise<GoodsListResult>{
        return this.goodsQuery('/goods/list/latest',{limit,page})
    }
    //shop_code
    static getGoodsListByShopId(page:number = 1,limit:number = 20,shop_code:string | undefined):Promise<GoodsListResult>{
        return this.goodsQuery('/goods/list/by/shop/code',{limit,page,shop_code})
    }
    //商品搜索
    static getGoodsListByKeyword(page:number = 1,limit:number = 20,keyword:string | null):Promise<GoodsListResult>{
        return this.goodsQuery('/search/goods',{page,limit,keyword})
    }
    static getGoodsListByQuery(page:number = 1,limit:number = 20,shop_type:string,date_type:string,order:string,date_start:string,date_end:string):Promise<GoodsListResult>{
        // return new Promise(async (resolve,reject) => {
        //     try {
        //         let result:any = await doDataRequest({url:'/goods/list/filter',data:{page,limit,shop_type,date_type,orders,date_start,date_end}})
        //         const {Data:GoodsList,Total} = result
        //         resolve({Ok:true,GoodsList:GoodsList || [],total:Total})
        //     }catch (e){
        //         resolve({Ok:false})
        //     }
        // })
        return this.goodsQuery('/goods/list/filter',{page,limit,shop_type,date_type,order,date_start,date_end})
    }
}
export default GoodsQuery