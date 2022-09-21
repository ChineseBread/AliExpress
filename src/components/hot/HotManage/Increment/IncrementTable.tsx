import React, {Fragment} from "react";

const isMax = (current:number,record:IncrementalData['data']) => {
    const {quantity_changes,wished_changes,rate_changes,reviews_changes} = record
    return current === Math.max(quantity_changes,wished_changes,reviews_changes,rate_changes) && current !== 0
}

const columns:Array<{title:string,dataIndex:string,render?:(value:any,record:IncrementalData) => any}> = [
    {
        title:'日销量',
        dataIndex:'data',
        render:(record:IncrementalData['data']) => isMax(record.daily_sales,record) ? <span style={{color:'#69c0ff'}}>{record.daily_sales}</span> : record.daily_sales,
        // sorter:(a,b) => a.data.daily_sales - b.data.daily_sales
    },
    {
        title:'收藏',
        dataIndex:'data',
        render:(record:IncrementalData['data']) => isMax(record.wished_changes,record) ? <span style={{color:'#69c0ff'}}>{record.wished_changes}</span> : record.wished_changes,
        // sorter:(a,b) => a.data.wished_changes - b.data.wished_changes
    },
    {
        title:'评分',
        dataIndex:'data',
        render:(record:IncrementalData['data']) => isMax(record.rate_changes,record) ? <span style={{color:'#69c0ff'}}>{record.rate_changes}</span> : record.rate_changes,
        // sorter:(a,b) => a.data.rate_changes - b.data.rate_changes
    },
    {
        title:'浏览',
        dataIndex:'data',
        render:(record:IncrementalData['data']) => isMax(record.reviews_changes,record) ? <span style={{color:'#69c0ff'}}>{record.reviews_changes}</span> : record.reviews_changes,
        // sorter:(a,b) => a.data.reviews_changes - b.data.reviews_changes
    },

]
function IncrementTable({dataSource}:{dataSource:IterableData<IncrementalData>[]}) {
    return (
        <Fragment>
            <div className='table-column'>
                {columns.map(({title}) => <span key={title}>{title}</span>)}
            </div>
            {dataSource.map((data) => <div key={`${data.from}${data.to}${data.item_id}`} className='table-column'>
                <span>{data.to}</span>
                {columns.map(({title,dataIndex,render}) => <span key={title}>{render ? render(data[dataIndex],data) : data[dataIndex]}</span>)}
            </div>)}
        </Fragment>
    )
}

export default IncrementTable;