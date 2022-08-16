import React, {useEffect, useState} from 'react';
import ItemsSearch from "@components/SingleItems/ItemsSearch";
import {ItemsData} from "@type/DataType";
import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
import {useSearchParams} from "react-router-dom";
import ItemsQuery from "@utils/request/data/ItemsQuery";
import {Image, Table} from "antd";
import {getTimestamp} from "@utils/TimeUtils";
const columns: ColumnsType<ItemsData> = [
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
        width:450
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
//全部单件
function AllItems() {
    const [data, setData] = useState<ItemsData[]>();
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 30,
        ...globalPageOptions
    });
    const [search,] = useSearchParams()
    useEffect(() => {
        fetchData()
    },[search])

    const fetchData = (page:number = 1,limit:number = 20) => {
        setLoading(true)
        const keyword = search.get('query')
        const QueryFunction = keyword ? ItemsQuery.getItemsListByKeyWord(page,limit,keyword) : ItemsQuery.getItemsList(page,limit)
        QueryFunction.then(result =>{
            setData(result.ItemsList)
            setLoading(false)
            setPagination(pagination => {
                return {
                    ...pagination,
                    current:page,
                    pageSize:limit,
                    total:result.total
                }
            })
        })
    }
    const handleTableChange = ({current,pageSize}: TablePaginationConfig) => {
        if (current === pagination.current && pageSize === pagination.pageSize) return;
        fetchData(current,pageSize)
    }
    return (
        <div className='goods-list-container box-shadow'>
            <ItemsSearch/>
            <Table
                rowKey={record => record.info_id}
                columns={columns}
                scroll={{y:'calc(100vh - 170px)'}}
                loading={loading}
                dataSource={data}
                onChange={handleTableChange}
                pagination={pagination}
            />
        </div>
    )
}

export default AllItems;