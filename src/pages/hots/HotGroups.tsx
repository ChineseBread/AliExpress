/**
 * @description 根据hots_id获取一个爆品组信息
 * @constructor
 */
import {useEffect, useState} from "react";
import {Link as RouterLink} from 'react-router-dom'
import {ColumnsType, TablePaginationConfig} from "antd/es/table";
import {message, Table} from "antd";
import GroupCreate from "@components/hot/HotGroup/GroupCreate";
import {getTimestamp} from "@utils/TimeUtils";
import HotQuery from "@utils/request/HotQuery";
import {globalPageOptions} from "@config/table/TableGlobalConfig";
const columns:ColumnsType<HotGroup> = [
    {
        title:'爆品组编码',
        dataIndex:'hots_id',
    },
    {
        title:'爆品组名称',
        dataIndex:'hots_name',
    },
    {
        title:'介绍',
        dataIndex:'hots_intro'
    },
    {
        title:'重量',
        dataIndex:'weigh'
    },
    {
        title:'单件数量',
        dataIndex:'item_ids',
        render:(ids:HotGroup['items_ids']) => ids.length
    },
    {
        title:'创建时间',
        dataIndex:'createtime',
        sorter:({createtime:a},{createtime:b}) => getTimestamp(a) - getTimestamp(b)
    },
    {
        title:'操作',
        dataIndex:'hots_id',
        render:id => <RouterLink to={`/hot/manage/${id}`}>查看爆品组</RouterLink>
    }
]
function HotGroups() {
    const [data,setData] = useState<HotGroup[]>([])
    const [loading,setLoading] = useState(true)
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 30,
        ...globalPageOptions
    });

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = (page:number = 1,limit:number = 20) => {
        HotQuery.getHotGroups(page,limit).then(result => {
            if (result.Ok){
                const {HotGroups = [],total = 0} = result
                setData(HotGroups)
                setLoading(false)
                setPagination(pagination => ({
                    ...pagination,
                    current:page,
                    pageSize:limit,
                    total
                }))
            }
        })
    }

    const handleTableChange = ({current,pageSize}: TablePaginationConfig) => {
        if (current === pagination.current && pageSize === pagination.pageSize) return;
        fetchData(current,pageSize)
    }
    const onFinish = (value:{hots_name:HotGroup['hots_name'],hots_intro:HotGroup['hots_intro']}) => {
        HotQuery.createHotGroup(value).then(result => message.info(result.Msg))
    }
    return (
        <div style={{width:'100%',height:'100%',background:'#fff',padding:'10px 15px'}}>
            <GroupCreate onFinish={onFinish}/>
            <Table
                scroll={{y:'calc(100vh - 170px)'}}
                columns={columns}
                loading={loading}
                pagination={pagination}
                rowKey={record => record.hots_id}
                onChange={handleTableChange}
                dataSource={data}
            />
        </div>
    )
}

export default HotGroups;