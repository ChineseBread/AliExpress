/**
 * @description 运费详情表
 */
import {Card, Table , Typography} from "antd";
import {useContext, useEffect, useState} from "react";
import {ColumnsType} from "antd/es/table";
import HotQuery from "@utils/request/HotQuery";
import {HotContext} from "@pages/hots/Manage";
const {Link} = Typography
interface DataType {
    item_id:string
    data:HotGroupShopInfo
}
const isMax = (current:number | string,record:HotGroupShopInfo):boolean => {
    const {followingNumber,positiveNum,positiveRate} = record
    return current > 0 && current === Math.max(followingNumber,positiveNum,Number(positiveRate.substring(0,positiveRate.length - 1)))
}
const columns:ColumnsType<DataType> = [
    {
        title:'商品编码',
        dataIndex:"item_id"
    },
    {
        title:'店铺名',
        dataIndex:'data',
        render:(_,{data}) => <Link target='_blank' href={data.storeURL}>{data.storeName}</Link>
    },
    {
        title:'店铺号',
        dataIndex:'data',
        render:(_,{data}) => data.storeNum
    },
    {
        title:'开张时间',
        dataIndex:'data',
        render:(_,{data}) => data.openTime
    },
    {
        title:'开店时长',
        dataIndex:'data',
        render:(_,{data}) => `${data.openedYear}年`
    },
    {
        title:'好评数',
        dataIndex:'data',
        render:(_,{data}) => isMax(data.positiveNum,data) ? <span style={{color:'#d4b106'}}>{data.positiveNum}</span> : data.positiveNum
    },
    {
        title:'好评率',
        dataIndex:'data',
        render:(_,{data}) => isMax(data.positiveRate,data) ? <span style={{color:'#d4b106'}}>{data.positiveRate}</span> : data.positiveRate
    },
    {
        title:'关注数',
        dataIndex:'data',
        render:(_,{data}) => isMax(data.followingNumber,data) ? <span style={{color:'#d4b106'}}>{data.followingNumber}</span> : data.followingNumber
    }
]
export default function ShopInfoList(){
    const {hots_id} = useContext(HotContext)
    const [data,setData] = useState<DataType[]>([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        HotQuery.getHotGroupShopInfoList<DataType[]>(hots_id).then(result => {
            if (result.Ok) setData(result.ShopInfoList || [])
            setLoading(false)
        })
    },[])

    return (
        <Card loading={loading} title='各店铺详情' className='hot-manage-data-card'>
            <Table
                rowKey={record => record.item_id}
                pagination={false}
                dataSource={data}
                columns={columns}
            />
        </Card>
    )
}