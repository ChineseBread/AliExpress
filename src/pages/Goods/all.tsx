import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Image, Table} from "antd";
import GoodsSearch from "@components/Goods/GoodsSearch";
import {TablePaginationConfig} from "antd/es/table/index.js";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
import GoodsQuery from "@utils/request/GoodsQuery";
import {getTimestamp} from "@utils/TimeUtils";
const { Column, ColumnGroup } = Table;
//全部商品
function AllGoods() {
    const [data, setData] = useState<GoodsData[]>();
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
        const QueryFunction = keyword ? GoodsQuery.getGoodsListByKeyword(page,limit,keyword) : GoodsQuery.getNewestGoodsList(page,limit)
        QueryFunction.then(result =>{
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
    const handleTableChange = ({current,pageSize}: TablePaginationConfig) => {
        if (current === pagination.current && pageSize === pagination.pageSize) return;
        fetchData(current,pageSize)
    }
    return (
        <div className='goods-list-container box-shadow'>
            <GoodsSearch/>
            <Table
                scroll={{y:'calc(100vh - 215px)',x:'calc(100vw-200px)'}}
                rowKey={record => record.good_id}
                onChange={handleTableChange}
                pagination={pagination}
                dataSource={data}
                loading={loading}
            >
                <Column width={80} title='商品编码' dataIndex='good_id' key='good_id' render={name => name}/>
                <Column width={600} title='商品名称' dataIndex='good_name' key='good_name' render={name => name}/>
                <Column width={100} title='商品图片' dataIndex='good_image' key='good_image' render={url => <Image width={80} height={80} src={url}/>}/>
                <ColumnGroup title="商品信息">
                    <Column width={70} title="价格" dataIndex="simple" key="price"
                            render={({good_price}) => good_price}
                    />
                    <Column width={70} title="订单数" dataIndex="simple" key="orders"
                            render={({good_orders}) => good_orders}
                    />
                    <Column width={70} title="浏览数" dataIndex="simple" key="reviews"
                            render={({good_reviews}) => good_reviews}
                    />
                    <Column width={70} title="点赞数" dataIndex="simple" key="likenums"
                            render={({good_reviews}) => good_reviews}
                    />
                    <Column width={70} title="评分" dataIndex="simple" key="rate"
                            render={({good_rate}) => good_rate}
                    />
                </ColumnGroup>
                <ColumnGroup title='销量'>
                    <Column width={70} title='日销量' key='day' dataIndex='sales' render={({day}) => day}/>
                    <Column width={70} title='周销量' key='week' dataIndex='sales' render={({week}) => week}/>
                    <Column width={70} title='月销量' key='month' dataIndex='sales' render={({month}) => month}/>
                </ColumnGroup>
                <Column width={100} title='更新时间' dataIndex='lastupdate' render={name => name} sorter={(a:GoodsData,b:GoodsData) => getTimestamp(a.lastupdate) - getTimestamp(b.lastupdate)}/>
            </Table>
        </div>
    )
}

export default AllGoods;