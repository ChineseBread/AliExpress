/**
 * @description 根据shop_code获取当前店铺的信息
 */
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import GoodsList from "@components/global/GoodsList";
import GoodsQuery from "@utils/request/GoodsQuery";
import {TablePaginationConfig} from "antd/es/table/index.js";
import {globalPageOptions} from "@config/table/TableGlobalConfig.js";
import {Button} from "antd";

function ShopInfo() {
    const navigator = useNavigate()
    const {shopid} = useParams()
    const [data, setData] = useState<GoodsData[]>();
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
        GoodsQuery.getGoodsListByShopId(page,limit,shopid).then(result =>{
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
        <div className='shops-list-container'>
            <Button onClick={() => navigator(-1)}>返回</Button>
            <GoodsList
                scroll={{y:'calc(100vh - 180px)'}}
                data={data}
                pagination={pagination}
                fetchData={fetchData}
                loading={loading}
            />
        </div>
    )
}

export default ShopInfo;