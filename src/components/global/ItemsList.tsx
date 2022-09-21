import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {Image, Table} from "antd";
import {getTimestamp} from "@utils/TimeUtils";
//单件表
type props = {
    columns?:ColumnsType<ItemsData>
    fetchData:(page:number | undefined,limit:number | undefined) => void,
    data:ItemsData[] | undefined
    loading:boolean
    pagination:TablePaginationConfig,
    scroll?:{y?:string,x?:string}
}
const defaultColumns: ColumnsType<ItemsData> = [
    {
        title: '单件编码',
        dataIndex: 'sku_id',
        render: name => name,
        width:80
    },
    {
        title: '单件名称',
        dataIndex: 'sku_title',
        render:name => name,
        width:500
    },
    {
        title: '单件图片',
        dataIndex: 'sku_image',
        render:url => <Image width={80} height={80} src={url}/>,
        width:90
    },
    {
        title:'导入时间',
        dataIndex:'lastupdate',
        render:name => name,
        sorter:(a,b) => getTimestamp(a.lastupdate) - getTimestamp(b.lastupdate),
        width:100
    }
];
function ItemsList({columns = defaultColumns,data,loading,fetchData,pagination,scroll = {y:'calc(100vh - 170px)',x:'calc(100vw - 200px)'}}:props) {

    const handleTableChange = ({current,pageSize}: TablePaginationConfig) => {
        if (current === pagination.current && pageSize === pagination.pageSize) return;
        fetchData(current,pageSize)
    }
    return (
        <Table
            scroll={scroll}
            columns={columns}
            rowKey={record => record.sku_id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default ItemsList;