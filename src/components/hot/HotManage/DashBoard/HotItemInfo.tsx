import {Descriptions, Typography, Tooltip, Card, Table} from "antd"
import {Fragment, useContext, useEffect, useState} from "react";
import {HotContext} from "@pages/hots/Manage";
import HotQuery from "@utils/request/HotQuery";
import {ColumnsType} from "antd/es/table";
const {Text} = Typography
/**
 * @description 爆品组数据
 */
const columns:ColumnsType<HotItem> = [
    {
        title:'商品编码',
        dataIndex:'item_id'
    },
    {
        title:'标题',
        dataIndex:'title',
        render:name => <Tooltip mouseEnterDelay={0.5} title={name}><Text style={{width:250}} ellipsis>{name}</Text></Tooltip>,
        width:300
    },
    {
        title:"折扣",
        dataIndex:'discount'
    },
    {
        title:'订单',
        dataIndex:'orders'
    },
    {
        title:'浏览',
        dataIndex:"reviews"
    },
    {
        title:'评分',
        dataIndex:'rate'
    },
    {
        title:'销量',
        dataIndex:'quantity'
    },
    {
        title:'收藏',
        dataIndex:'wished'
    }
]
export default function HotItemInfo() {

    const {hots_id} = useContext(HotContext)

    const [loading,setLoading] = useState(true)
    const [info,setInfo] = useState<HotItem[]>([])
    const [groupInfo,setGroupInfo] = useState<HotGroup>({hots_id,hots_name:'',hots_intro:'',weigh:0,items_ids:[],createtime:''})
    useEffect(() => {
        HotQuery.getHotGroupInfo<HotGroup,HotItem[]>(hots_id).then(result => {
            if (result.Ok) {
                const {HotItemInfo,GroupInfo} = result
                setGroupInfo(GroupInfo || groupInfo)
                setInfo(HotItemInfo || info)
            }
            setLoading(false)
        })
    },[])

    return (
        <Fragment>
            <Descriptions title='爆品组详情' bordered>
                <Descriptions.Item label='名称'>{groupInfo.hots_name}</Descriptions.Item>
                <Descriptions.Item label='简介'>{groupInfo.hots_intro}</Descriptions.Item>
                <Descriptions.Item label='创建日期'>{groupInfo.createtime}</Descriptions.Item>
            </Descriptions>
            <Table
                loading={loading}
                columns={columns}
                dataSource={info}
                pagination={false}
                rowKey={record => record.item_id}
            />
        </Fragment>
    )
}
