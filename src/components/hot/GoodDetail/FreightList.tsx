import {ColumnsType} from "antd/es/table";
import {Table} from "antd";

const columns:ColumnsType<Domain> = [
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
        sorter:(a,b) => a.cost - b.cost
    },
    {
        title:'物流渠道',
        dataIndex:'transfer'
    }
]
export default function FreightList({list}:{list:Domain[]}){
    return(
        <Table
            pagination={false}
            dataSource={list}
            rowKey={({to,cost,from,transfer}) => `${to}${from}${cost}${transfer}`}
            columns={columns}
        />
    )
}