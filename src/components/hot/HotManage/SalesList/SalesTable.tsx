
/**
 * @description 自定义销量列表
 */
import React,{Fragment} from 'react';

const isMax = (current:number,record:SalesItem) => {
    const {wished,orders,quantity,rate} = record
    return current === Math.max(wished,orders,quantity,rate) && current > 0
}

const columns:Array<{title:string,dataIndex:string,render?:(value:any,record:SalesItem) => any}> = [
    {
        title:'收藏',
        dataIndex:'wished',
        render:(wished,record) => isMax(wished,record) ? <span style={{color:'#69c0ff'}}>{wished}</span> : wished,
        // sorter:(a,b) => a.wished - b.wished
    },
    {
        title:'订单数',
        dataIndex:'orders',
        render:(orders,record) => isMax(orders,record) ? <span style={{color:'#69c0ff'}}>{orders}</span> : orders,
        // sorter:(a,b) => a.orders - b.orders
    },
    {
        title:'销量',
        dataIndex:'quantity',
        render:(quantity,record) => isMax(quantity,record) ? <span style={{color:'#69c0ff'}}>{quantity}</span> : quantity,
        // sorter:(a,b) => a.quantity - b.quantity
    },
    {
        title:'评分',
        dataIndex:'rate',
        render:(rate,record) => isMax(rate,record) ? <span style={{color:'#69c0ff'}}>{rate}</span> : rate,
        // sorter:(a,b) => a.rate - b.rate
    },
    {
        title:'折扣',
        dataIndex:'discount'
    },
    {
        title:'浏览量',
        dataIndex:'reviews'
    },
    {
        title:'创建天数',
        dataIndex:'diff_day'
    }
]

function SalesTable({dataSource}:{dataSource:IterableData<SalesItem>[]}) {
    return (
        <Fragment>
            <div className='table-column'>
                {columns.map(({title}) => <span key={title}>{title}</span>)}
            </div>
            {dataSource.map((data) => <div key={data.item_id} className='table-column'>
                <span>{`商品:${data.item_id}`}</span>
                {columns.map(({dataIndex,render}) => {
                    return <span key={dataIndex}>{render ? render(data[dataIndex],data) : data[dataIndex]}</span>
                })}
            </div>)}
        </Fragment>
    )
}

export default SalesTable;