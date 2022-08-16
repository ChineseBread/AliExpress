/**
 * @description 疑似停更表
 */

import React, {useEffect, useState} from 'react';
import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {Image, Table} from "antd";
import {getTimestamp} from "@utils/TimeUtils";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
import GoodsQuery from "@utils/request/data/GoodsQuery";
import {SuspectedItemsData} from "@type/DataType";

const columns: ColumnsType<SuspectedItemsData> = [
    {
        title: '商品编码',
        dataIndex: 'shop_code',
        render: name => name,
    },
    {
        title: '商品名称',
        dataIndex: 'good_name',
        render:name => name,
        width:480
    },
    {
        title: '商品图片',
        dataIndex: 'good_image',
        render:(url,{good_url}) => <a href={good_url} target='_blank'><Image preview={false} width={80} height={80} src={url}/></a>
    },
    {
        title: '停更天数',
        dataIndex: 'difference',
        render:name => name,
        sorter:(a,b) => a.difference - b.difference
    },
    {
        title:'最后更新时间',
        dataIndex:'createtime',
        render:name => name,
        sorter:(a,b) => getTimestamp(a.createtime) - getTimestamp(b.createtime)
    },
];
function SuspectedTapinator() {
    const [data, setData] = useState<SuspectedItemsData[]>();
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 30,
        ...globalPageOptions
    });

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = (page:number = 1,limit:number = 20) => {
        setLoading(true)
        GoodsQuery.getSuspectedTapinatorGoods(page,limit).then(result =>{
            setData(result.GoodsList)
            setLoading(false)
            setPagination(pagination => {
                return {
                    ...pagination,
                    current:page,
                    pageSize:limit,
                    total:result.total,
                }
            })
        })
    }

    const handleTableChange = ({current,pageSize}: TablePaginationConfig) => {
        if (current === pagination.current && pageSize === pagination.pageSize) return;
        fetchData(current,pageSize)
    }

    return (
        <Table
            scroll={{y:'calc(100vh - 335px)'}}
            columns={columns}
            rowKey={record => record.item_id}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default SuspectedTapinator;