interface SearchData {
    keyword:string
    cate:string
    limit:number
    page:number
    weight_range:number[]
}
//上一步中已选中的类型数据
interface ModalData {
    type_code:string
    type_cate:string
    type_cost:number
    type_weighs:string
    images:string[]
}