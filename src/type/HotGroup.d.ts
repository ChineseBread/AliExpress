

/**
 * @description 爆品数据
 */
interface HotItem{
    item_id:string
    date:string
    title:string
    discount:number
    orders:number
    reviews:number
    rate:number
    quantity:number
    wished:number
    sale_amount_low:number
    sale_amount_high:number
    raw_amount_low:number
    raw_amount_high:number
}

/**
 * @desc 单个爆品组
 */
interface HotGroup{
    hots_id:number
    hots_name:string
    hots_intro:string
    weigh:0
    items_ids:Array<HotItem['item_id']>
    createtime:string
}
interface HotGroupShopInfo{
    hasStore:boolean
    openTime:string
    siteType:string
    storeNum:number
    storeURL:string
    companyId:number
    productId:number
    storeName:string
    openedYear:number
    positiveNum:number
    positiveRate:string
    detailPageUrl:string
    feedbackServer:string
    hasStoreHeader:boolean
    sellerAdminSeq:number
    toRateSeller:boolean
    followingNumber:number
    toBrandDescUrl:string
    countryCompleteName:string
    hideCustomerName:string
    esRetailConsignment:string
    feedbackMessageServer:string
}
//运费定价区域
interface Domain {to:string,cost:number,from:string,transfer:string}
//爆品组下单件对应的skus
interface HotGroupItemSku {sku_id:string,discount:number,quantity:number,big_image:string,sku_price:number,small_image:string,sku_raw_price:number}