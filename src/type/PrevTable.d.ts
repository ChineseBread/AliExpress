interface skuItem{
    id:number
    series_num:number
    tag:string
    cate:string
    shop_num:number
    image:string
    preview_image:string
    price:number
    weight:number
}
//前置表格数据预览
interface PrevTableColumn{
    id:string
    sku1:string,
    sku1_weight:number
    sku1_cost:number
    sku6:string
    sku6_weight:number
    sku6_cost:number
    shop_num:number
    profit_rate:number
    exchange_rate:number
    sales_count:number
    title:string
    price_method:'fixed' | 'dynamic'
    shopping_template:{
        weight:number,
        name:string
    }
    skus:skuItem[]
}
export {PrevTableColumn,SkuItem}