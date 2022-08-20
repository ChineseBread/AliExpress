//单件列表

interface ItemsData {
    info_id:string | number
    shop_code:string | number
    sku_title:string
    sku_id: string | number
    sku_image:React.ReactNode
    sku_tags:React.ReactNode
    lastupdate:string
}
interface GoodsData {
    good_id:string | number
    shop_code:string | number
    item_id:string | number
    good_name:string
    good_image:React.ReactNode
    goods_tags:React.ReactNode
    lastupdate:string
    good_intro:string
    simple:{
        item_id:string
        good_price:number
        good_reviews:number
        good_orders:number
        like_nums:number
        good_rate:number
        createtime:string
    }
    sales:{
        day:number
        week:number
        month:number
    }
    names:{
        item_id:string
        //重复
        good_name:string
        importdate:string
    }
}
//断更数据
interface SuspectedItemsData {
    data_id:string | number
    shop_code:string | number
    item_id:string | number
    good_name:string
    good_price:string | number
    good_orders:string | number
    good_reviews:string | number
    good_rate:string | number
    like_nums:string | number
    good_image:React.ReactNode
    sale_switch:string | number
    sale_count:string | number
    good_url:string
    createtime:string
    difference:number
}
interface ShopsData {
    shop_id:string | number
    shop_code:string | number
    shop_url:string
    shop_createtime:string
    shop_cateid:string
    shop_tags:React.ReactNode
}