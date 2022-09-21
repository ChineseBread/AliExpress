declare type SalesItem = Omit<HotItem, 'sale_amount_low' | 'raw_amount_low' | 'sale_amount_high' | 'raw_amount_high'> & {diff_day:number}
interface SalesData{
    date:string
    list:SalesItem[]
}