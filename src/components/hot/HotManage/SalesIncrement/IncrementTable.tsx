import React, {Fragment} from 'react';
import {Space} from "antd";
import {getTimestamp} from "@utils/TimeUtils";
type Props = {
    dataSource:SalesIncrement[]
}
function IncrementTable({dataSource}:Props) {
    const styleDecorator = (current:number,values:number[]) => {
        //@params current probably be null
        current = current || 0
        if (current === 0) return {display:'inline-block',width:45}
        if (current === Math.max(current,...values)) return {display:'inline-block',width:45,color:'#fa541c'}
        if (current === Math.min(current,...values)) return {display:'inline-block',width:45,color:'#52c41a'}
        return {display:'inline-block',width:45}
    }
    const getColumns = ():Column<SalesIncrement>[] => {
        return [
            {title:'商品编码',dataIndex:'item_id'},
            {title:'加入时间',dataIndex:'join_date'},
            {title:'',dataIndex: '',render: () => <Space>
                    <span style={{display:'inline-block',width:45}}>收藏</span>
                    <span style={{display:'inline-block',width:45}}>订单</span>
                    <span style={{display:'inline-block',width:45}}>销量</span>
                    <span style={{display:'inline-block',width:45}}>评价</span>
                </Space>
            },
            ...dataSource[0].range_arr.map(({from,to},index) => ({title:`${from} ~ ${to} ${((getTimestamp(to) - getTimestamp(from)) / 86400).toFixed(0)}天`,dataIndex:'',render:(value:any,{range_arr}:SalesIncrement) => {
                    const {wished_changes,daily_sales,quantity_changes,rate_changes} = range_arr[index].data
                    const values = [wished_changes,daily_sales,quantity_changes,rate_changes].map(ele => ele || 0)
                    return <Space>
                        <span style={styleDecorator(wished_changes,values)}>{wished_changes || 0}</span>
                        <span style={styleDecorator(daily_sales,values)}>{daily_sales || 0}</span>
                        <span style={styleDecorator(quantity_changes,values)}>{quantity_changes || 0}</span>
                        <span style={styleDecorator(rate_changes,values)}>{rate_changes || 0}</span>
                    </Space>
                }}))
        ]
    }
    return (
        <Fragment>
            { getColumns().map(({title,dataIndex,render}) => {
                return <tr key={title}>
                    <td className='column-title-cell'>
                        {title}
                    </td>
                    {dataSource.map((value,index) => {
                        return <td key={value.item_id} className='column-data-cell'>
                            {render ? render(value[dataIndex],value,index) : value[dataIndex]}
                        </td>
                    })}
                </tr>
            }) }
        </Fragment>
    )
}

export default IncrementTable;