interface SearchData {
    keyword:string
    cate:string
    limit:number
    page:number
    weight_range:number[]
    order:boolean
}
//上一步中已选中的类型数据
interface ModelData {
    type_code:string
    type_cate:string
    type_cost:number
    type_weighs:number
    series_num:number
    images:string[]
}