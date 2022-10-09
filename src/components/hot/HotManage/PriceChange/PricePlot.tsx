import React, {useState} from 'react';
import PricePlotForm from "@components/hot/HotManage/PriceChange/PricePlotForm";
import {LineConfig} from "@ant-design/plots/es/components/line";
import {Line} from "@ant-design/plots";
import {message} from "antd";
type Props = {
    dataSource:DateShipping[]
}
function PricePlot({dataSource}:Props) {
    const [data,setData] = useState<Array<{day:string,cost:FreightDomain['cost'],transfer:FreightDomain['transfer']}>>([])

    const onFinish = (item_id:string) => {
        const result:typeof data = []
        let curr = dataSource.find(ele => ele.item_id === item_id) || {data:[]}
        //找到当前商品对应的每一个物流渠道
        let template:DateShipping['data'][number] | undefined = curr.data.find(ele => ele.data.length >= 1)
        if (!template) {
            message.warn('当前商品没有运费数据')
            return
        }else {
            curr.data.forEach(({date,data}) => {
                if (data.length === 0){
                    (template || {data:[]}).data.forEach(({transfer}) => {
                        result.push({day:date,cost:0,transfer})
                    })
                }else {
                    data.forEach(({transfer,cost}) => {
                        result.push({day:date,cost,transfer})
                    })
                }
            })
            setData(result)
        }
    }
    const config:LineConfig = {
        data,
        xField: 'day',
        yField: 'cost',
        seriesField: 'transfer',
    };

    return (
        <tr>
            <td>
                <PricePlotForm dataSource={dataSource} onFinish={onFinish}/>
            </td>
            <td colSpan={dataSource.length + 1}>
                <Line {...config}/>
            </td>
        </tr>
    )
}

export default PricePlot;