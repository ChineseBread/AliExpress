/**
 * @description 新增商品表
 */
import GoodsList from "@components/Global/GoodsList";
import {useEffect, useState} from "react";
import {GoodsData} from "@type/DataType";
import {TablePaginationConfig} from "antd/es/table";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
import GoodsQuery from "@utils/request/data/GoodsQuery";

function NewlyIncreasedGoods() {
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
        GoodsQuery.getNewlyIndexedGoods(page,limit).then(result =>{
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
        <GoodsList
            scroll={{y:'calc(100vh - 335px)'}}
            loading={loading}
            data={data}
            fetchData={fetchData}
            pagination={pagination}
        />
    )
}

export default NewlyIncreasedGoods;