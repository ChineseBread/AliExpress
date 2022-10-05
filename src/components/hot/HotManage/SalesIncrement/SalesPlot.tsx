import React, {Fragment, useState} from 'react';
import { Button, Space } from 'antd';
import {Line} from "@ant-design/plots";
import {LineConfig} from "@ant-design/plots/es/components/line";
type Props = {
    dataSource:SalesIncrement[]
}
function SalesPlot({dataSource}:Props) {

    const [type,setType]  = useState<{key:'销量',dataIndex:'daily_sales'} | {key:'收藏',dataIndex:'wished_changes'} | {key:'订单',dataIndex:'quantity_changes'}>({key:'销量',dataIndex:'daily_sales'})

    const getData = ():Array<{day:string,value:number,category:HotItem['item_id']}> => {
        const result:Array<{day:string,value:number,category:HotItem['item_id']}> = []
        dataSource.forEach(({range_arr}) => {
            result.push(...range_arr.map(({item_id,from,data}) => ({day:from,category:item_id,value:data[type.dataIndex] || 0})))
        })
        return result
    }

    const config:LineConfig = {
        data:getData(),
        xField: 'day',
        yField: 'value',
        seriesField: 'category',
        legend:{
          itemName:{
              formatter:v => v === dataSource[0].item_id ? `${v}(主爆品)` : (dataSource.length >= 2 && v === dataSource[1].item_id) ?  `${v}(主竞品)` : `商品:${v}`
          }
        },
        // xAxis:{
        //     type:'time',
        // },
        yAxis:{
            tickInterval:1,
        },
        // colorField:'category',
        // @ts-ignore
        // color:({category}) => {
        //     if (category === dataSource[0].item_id) return '#d87d4b'
        //     if (category === dataSource[1]?.item_id) return'#5b6493'
        // },
        tooltip:{
            // position:'bottom',
            fields:['category','value'],
            formatter:({category,value}) => {
              return {name:category === dataSource[0].item_id ? `${category}(主爆品)` : (dataSource.length >= 2 && category === dataSource[1].item_id) ?  `${category}(主竞品)` : `商品:${category}`,value}
            }
        },
    };
    return (
        <Fragment>
            <tr>
                <td>
                    <Space direction='vertical' style={{width:'100%'}} align='center'>
                        <Button type='default' onClick={() => setType({key:'销量',dataIndex:'daily_sales'})}>
                            销量
                        </Button>
                        <Button type='default' onClick={() => setType({key:"订单",dataIndex:'quantity_changes'})}>
                            订单
                        </Button>
                        <Button type='default' onClick={() => setType({key:'收藏',dataIndex:'wished_changes'})}>
                            收藏
                        </Button>
                    </Space>
                </td>
                <td colSpan={dataSource.length}>
                    <Line {...config} />
                </td>
            </tr>
        </Fragment>
    )
}

export default React.memo(SalesPlot,(prevProps, nextProps) => prevProps.dataSource === nextProps.dataSource);