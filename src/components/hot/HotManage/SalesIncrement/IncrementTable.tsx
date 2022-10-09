import React, {Fragment} from 'react';
import {Space} from "antd";
import {getTimestamp} from "@utils/TimeUtils";
type Props = {
    dataSource:SalesIncrement[]
}
function IncrementTable({dataSource}:Props) {
    const styleDecorator = (current:number,...values:number[]) => {
        values = values.map(ele => ele || 0)
        //@params current probably be null
        if (current === 0) return {}
        if (current === Math.max(current,...values)) return {color:'#fa541c'}
        if (current === Math.min(current,...values)) return {color:'#52c41a'}
        return {}
    }
    const columns:Column<SalesIncrement>[] = [
        {title:'商品编码',dataIndex:'item_id'},
        {title:'加入时间',dataIndex:'join_date'},
        {title:'',dataIndex: '',render: () => <Space>
                <span className='increment-data-cell'>收藏</span>
                <span className='increment-data-cell'>订单</span>
                <span className='increment-data-cell'>销量</span>
                <span className='increment-data-cell'>评价</span>
            </Space>
        },
        ...dataSource[0].range_arr.map(({from,to},index) => ({title:`${from} ~ ${to} ${((getTimestamp(to) - getTimestamp(from)) / 86400).toFixed(0)}天`,dataIndex:'',render:(value:any,{range_arr}:SalesIncrement) => {
                const {wished_changes,daily_sales,quantity_changes,rate_changes} = range_arr[index].data
                // const values = [wished_changes,daily_sales,quantity_changes,rate_changes].map(ele => ele || 0)
                return <Space>
                    <span className='increment-data-cell' style={styleDecorator(wished_changes || 0,wished_changes,daily_sales,quantity_changes,rate_changes)}>{wished_changes || 0}</span>
                    <span className='increment-data-cell' style={styleDecorator(quantity_changes || 0,wished_changes,daily_sales,quantity_changes,rate_changes)}>{quantity_changes || 0}</span>
                    <span className='increment-data-cell' style={styleDecorator(daily_sales || 0,wished_changes,daily_sales,quantity_changes,rate_changes)}>{daily_sales || 0}</span>
                    <span className='increment-data-cell' style={styleDecorator(rate_changes || 0,wished_changes,daily_sales,quantity_changes,rate_changes)}>{rate_changes || 0}</span>
                </Space>
            }})),
        {title:'周期总量',dataIndex:'',render:(value,{analysis:{cycle:{cycle_orders,rate_changes,cycle_sales,cycle_wished}}},index) => <Space>
                <span className='increment-data-cell'>{cycle_wished}</span>
                <span className='increment-data-cell'>{cycle_orders}</span>
                <span className='increment-data-cell'>{cycle_sales}</span>
                <span className='increment-data-cell'>{rate_changes}</span>
            </Space>},
        {title:'所有总量',dataIndex:'',render:(value, {analysis:{total:{total_wished,total_orders,total_rates,total_sales}}}, index) => <Space>
                <span className='increment-data-cell' style={styleDecorator(total_wished,total_wished,total_orders,total_rates,total_sales)}>{total_wished}</span>
                <span className='increment-data-cell' style={styleDecorator(total_orders,total_wished,total_orders,total_rates,total_sales)}>{total_orders}</span>
                <span className='increment-data-cell' style={styleDecorator(total_sales,total_wished,total_orders,total_rates,total_sales)}>{total_sales}</span>
                <span className='increment-data-cell' style={styleDecorator(total_rates,total_wished,total_orders,total_rates,total_sales)}>{total_rates}</span>
            </Space>},
        {title:'周期份额',dataIndex:'',render:(value, {analysis:{total:{total_sales,total_orders,total_rates,total_wished},cycle:{rate_changes,cycle_sales,cycle_wished,cycle_orders}}}, index) => <Space>
                <span className='increment-data-cell'>{total_wished === 0 ? `${cycle_wished}/0` : `${(cycle_wished / total_wished).toFixed(0)}%`}</span>
                <span className='increment-data-cell'>{total_orders === 0 ? `${cycle_orders}/0` : `${(cycle_orders / total_orders).toFixed(0)}%`}</span>
                <span className='increment-data-cell'>{total_sales === 0 ? `${cycle_sales}/0` : `${(cycle_sales / total_sales).toFixed(0)}%`}</span>
                <span className='increment-data-cell'>{total_rates === 0 ? `${rate_changes}/0` : `${(rate_changes / total_rates).toFixed(0)}%`}</span>
            </Space>},
        {title:'收藏/订单',dataIndex:'',render:(value, {analysis:{total:{total_wished,total_orders}}}, index) => total_orders === 0 ? `${total_wished}/0` : (total_wished / total_orders).toFixed(0)},
        {title:'评价/订单',dataIndex:'',render:(value, {analysis:{total:{total_rates,total_orders}}}, index) => total_orders === 0 ? `${total_rates}/0` : (total_rates / total_orders).toFixed(0)},
        {title:'销量/订单',dataIndex:'',render:(value, {analysis:{total:{total_sales,total_orders}}}, index) => total_orders === 0 ? `${total_sales}/0` : (total_sales / total_orders).toFixed(0)}
    ]
    return (
        <Fragment>
            { columns.map(({title,dataIndex,render}) => {
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