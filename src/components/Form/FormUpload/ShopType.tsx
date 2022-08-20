/**
 * @description 自定义select 动态获取分页数据的
 * @param props
 * @constructor
 */
import React, {useEffect, useState} from "react";
import {Spin,Select} from "antd";
import FormQuery from "@utils/request/FormQuery";
type props = {
    onChange?:(value:string) => void
}
export default function ShopType({onChange}:props){
    const [loading,setLoading] = useState(true)
    const [options,setOptions] = useState<any[]>([])
    const [searchValue,setValue] = useState('')
    useEffect(() => {
        FormQuery.getShopId().then(result => {
            if (!result.Ok) return
            setOptions(result.ShopIds || [])
            setLoading(false)
        })
    },[])
    const onSelectChange = (value:string) => {
        setValue(value)
        onChange?.(value)
    }
    return (
        <Select
            value={searchValue}
            onChange={onSelectChange}
            options={options.map(({shop_num}) => ({value:shop_num,label:<span style={{display:'inline-block',width:'100%',textAlign:'center'}}>{`店铺号${shop_num}`}</span>}))}
            notFoundContent={loading ? <Spin size='small'/> : null}
        />
    )
}