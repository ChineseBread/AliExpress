// 横向表格数据渲染
declare type Column<T> = {
    //数据索引
    dataIndex:string
    //表第一列渲染数据
    title:string,
    render?:(value:any,record:T,index:number) => any
}
declare type DataItem = IterableData<{
    item_id:HotItem['item_id'],
    join_date:string,
    start_date:string
    data:HotItem & {
        id:string,
        good_images:string[],
        store:HotGroupShopInfo,
        skus:HotGroupItemSku[],
        shipping:FreightDomain[]
    }
}>

declare type DateShipping = {
    item_id:string
    good_image:string
    data:Array<{date:string,data:FreightDomain[]}>
}

declare type SalesIncrement = IterableData<{
    item_id:string,
    diff_day:number,
    join_date:string,
    analysis:{
        cycle:{
            cycle_sales:number
            cycle_wished:number
            cycle_reviews:number
            cycle_orders:number
            rate_changes:number
        }
        total:{
            total_sales:number
            total_wished:number
            total_reviews:number
            total_orders:number
            total_rates:number
        }
    }
    range_arr:Array<{
        from:string,
        to:string,
        item_id:string,
        data:{
            wished_changes:number
            daily_sales:number,
            quantity_changes:number,
            rate_changes:number,
            reviews_changes:number
        }
    }>,
    history_min:{
        item_id:string,
        date:string,
        sale_amount_low:number
    }
}>
declare type AnalyzeItem = IterableData<{
    sku_id:HotGroupItemSku['sku_id'],
    orders:number,
    rate:number,
    is_new:boolean,
    small_image:string
    big_image:string
}>
