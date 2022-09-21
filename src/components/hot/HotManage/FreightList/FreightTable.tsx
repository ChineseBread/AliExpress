import { Fragment } from "react";

/**
 * @description 运费表
 * @constructor
 */
const columns:Array<{title:string,dataIndex:string,render?:(value:any,record:Domain) => any}> = [
    {
        title:'起点',
        dataIndex:'from'
    },
    {
        title:'终点',
        dataIndex:'to'
    },
    {
        title:'价格',
        dataIndex:'cost',
        render:cost => `$${cost}`,
        // sorter:(a,b) => a.cost - b.cost
    },
    {
        title:'物流渠道',
        dataIndex:'transfer'
    }
]
function FreightTable({dataSource}:{dataSource:IterableData<Domain>[]}) {
    return (
        <Fragment>
            <div className='table-column'>
                {columns.map(({title}) => <span key={title}>{title}</span>)}
            </div>
            {dataSource.map((domain,index) => <div key={`${domain.to}${domain.from}${domain.cost}`} className='table-column'>
                <span>{`渠道${index + 1}`}</span>
                {columns.map(({title,dataIndex,render}) => <span key={title}>{render ? render(domain[dataIndex],domain) : domain[dataIndex]}</span>)}
            </div>)}
        </Fragment>
    )
}

export default FreightTable;