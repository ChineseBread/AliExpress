/**
 * @description 新增单件表
 */
import ItemsList from "@components/global/ItemsList";
import ItemsQuery from "@utils/request/ItemsQuery";
import {useEffect, useState} from "react";
import {TablePaginationConfig} from "antd/es/table";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
function NewlyIncreasedItems() {
    const [data, setData] = useState<ItemsData[]>();
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
        ItemsQuery.getNewlyIndexedItems(page,limit).then(result =>{
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

    return (
        <ItemsList
            loading={loading}
            data={data}
            fetchData={fetchData}
            pagination={pagination}
            scroll={{y:'calc(100vh - 335px)'}}
        />
    )
}

export default NewlyIncreasedItems;