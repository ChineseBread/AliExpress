import React, {useEffect, useState} from 'react';
import GoodsSelectForm from "@components/Goods/GoodsSelectForm";
import GoodsList from "@components/Global/GoodsList";
import {GoodsData} from "@type/DataType";
import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
import GoodsQuery from "@utils/request/data/GoodsQuery";
//order: all reviews rate likes price
const columns:ColumnsType<GoodsData> = [
    {
        title:"单件编号",
        dataIndex:'item_id',
        render:name => name
    },
    {
        title:'商品名称',
        dataIndex:'names',
        render:({good_name}) => good_name,
        width:400
    },
    {
        title:'价格',
        dataIndex:'simple',
        render:({good_price}) => good_price,
        sorter:({simple:{good_price:a}},{simple:{good_price:b}}) => a - b
    },
    {
        title:'订单数',
        dataIndex:'simple',
        render:({good_orders}) => good_orders,
        sorter:({simple:{good_orders:a}},{simple:{good_orders:b}}) => a - b
    },
    {
        title:'点赞数',
        dataIndex:'simple',
        render:({like_nums}) => like_nums,
        sorter:({simple:{like_nums:a}},{simple:{like_nums:b}}) => a - b
    },
    {
        title:'评分',
        dataIndex:'simple',
        render:({good_rate}) => good_rate,
        sorter:({simple:{good_rate:a}},{simple:{good_rate:b}}) => a - b
    },
    {
        title:'创建时间',
        dataIndex:'createtime',
        render:name => name
    },
]
//商品选择
function SelectGoods() {
    const [searchValue,setValue] = useState<any>()
    const [data, setData] = useState<GoodsData[]>();
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 30,
        ...globalPageOptions
    });
    useEffect(() => {
        fetchData()
    },[searchValue])
    const fetchData = (page:number = 1,limit:number = 20) => {
        if (!searchValue) return
        setLoading(true)
        const {shop_type,date_type,order,date_start,date_end} = searchValue
        GoodsQuery.getGoodsListByQuery(page,limit,shop_type,date_type,order,date_start,date_end).then(result =>{
            setData(result.GoodsList)
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
    return (
        <div className='goods-list-container'>
            <GoodsSelectForm setValue={setValue}/>
            <GoodsList
                scroll={{y:'calc(100vh - 150px)'}}
                // scroll={{y:'30rem'}}
                columns={columns}
                data={data}
                pagination={pagination}
                fetchData={fetchData}
                loading={loading}
            />
        </div>
    )
}

export default SelectGoods;