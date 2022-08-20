import React, {useEffect, useState} from 'react';
import {Link as RouterLink} from "react-router-dom";
import {Table, Typography} from "antd";
import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {getTimestamp} from "@utils/TimeUtils";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
import ShopsQuery from "@utils/request/ShopsQuery";
const {Link} = Typography
const columns: ColumnsType<ShopsData> = [
    {
        title:'店铺编码',
        dataIndex:'shop_code',
        render:(code,{shop_url}) => <Link target="_blank" href={shop_url}>{code}</Link>
    },
    {
        title:'店铺名称',
        dataIndex:'shop_name',
        render:value =>  value
    },
    {
        title:'创建时间',
        dataIndex:'shop_createtime',
        render:name => name,
        sorter:(a,b) => getTimestamp(a.shop_createtime) - getTimestamp(b.shop_createtime)
    },
    {
        title:'操作',
        dataIndex:'operation',
        render:(_,{shop_code}) => <RouterLink to={`/shop/goods/${shop_code}`}>查看店铺商品</RouterLink>,
    }
];
//店铺表
function ShopLists() {

    const [data, setData] = useState<ShopsData[]>();
    const [loading, setLoading] = useState(false);
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
        ShopsQuery.getShopsList(page,limit).then(result =>{
            setData(result.ShopsList)
            setPagination(pagination => {
                return {
                    ...pagination,
                    current:page,
                    pageSize:limit,
                    total:result.total
                }
            })
            setLoading(false)
        })
    }

    const handleTableChange = ({current,pageSize}: TablePaginationConfig) => {
        if (current === pagination.current && pageSize === pagination.pageSize) return;
        fetchData(current,pageSize)
    }
    return (
        <Table
            scroll={{y:'calc(100vh - 135px)'}}
            columns={columns}
            rowKey={record => record.shop_code}
            dataSource={data}
            pagination={pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}

export default ShopLists;