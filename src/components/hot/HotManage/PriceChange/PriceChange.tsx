import React, {useContext, useEffect, useState} from 'react';
import {Empty, message, Skeleton} from "antd";
import HotQuery from "@utils/request/HotQuery";
import {HotContext} from "@pages/hots/Manage";
import {getCurrentTime, getFormatTime, getTimestamp} from "@utils/TimeUtils";
import SalesDatePicker from "@components/hot/HotManage/SalesDatePicker";
import PricePlot from "@components/hot/HotManage/PriceChange/PricePlot";


/**
 * @description 运费变化表
 */

function PriceChange() {
    const {hots_id} = useContext(HotContext)
    const [data,setData] = useState<DateShipping[]>([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        HotQuery.getGoodsShippingByDate<typeof data>(hots_id,getFormatTime(getTimestamp(getCurrentTime()) - 86400 * 30,'YYYY-MM-DD'),getFormatTime(getTimestamp(getCurrentTime()) - 86400,'YYYY-MM-DD')).then(result => {
            if (result.Ok) setData(result.ShippingList || [])
            setLoading(false)
        })
    },[])
    const onFinish = (start_date:string = getFormatTime(getTimestamp(getCurrentTime()) - 86400 * 30,'YYYY-MM-DD'),end_date:string = getCurrentTime()) => {
        message.loading({content:`查询${start_date} ~ ${end_date}`,key:'loading'})
        HotQuery.getGoodsShippingByDate<typeof data>(hots_id,start_date,end_date).then(result => {
            if (result.Ok) {
                setData(result.ShippingList || [])
            }
            message.destroy('loading')
        })
    }
    return (
        <Skeleton active loading={loading} style={{width:'calc(100vw - 270px)'}}>
            <tbody>
                <tr>
                    <th colSpan={Math.max(data.length + 1,6)}>
                        运费价格分析表
                    </th>
                </tr>
                <tr>
                    <td colSpan={Math.max(data.length + 1,6)}><SalesDatePicker onFinish={onFinish}/></td>
                </tr>
                {data.length >= 1 ? <PricePlot dataSource={data}/> : <Empty/>}
            </tbody>
        </Skeleton>
    )
}

export default PriceChange;