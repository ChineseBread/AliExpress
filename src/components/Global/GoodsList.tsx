import {Table} from "antd";
import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {GoodsListDefaultColumns} from "@config/table/TableGlobalConfig";

//商品表
type props = {
    columns?:ColumnsType<GoodsData>
    fetchData:(page:number | undefined,limit:number | undefined) => void
    data:GoodsData[] | undefined
    loading:boolean
    pagination:TablePaginationConfig,
    scroll?:{y:string}
}

function GoodsList({columns = GoodsListDefaultColumns,data,loading,pagination,scroll = {y:'calc(100vh - 135px)'},fetchData}:props) {


    const handleTableChange = ({current,pageSize}: TablePaginationConfig) => {
        if (current === pagination.current && pageSize === pagination.pageSize) return;
        fetchData(current,pageSize)
    }
    return (
        <Table
            scroll={scroll}
            columns={columns}
            rowKey={record => record.good_id || record.item_id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default GoodsList;