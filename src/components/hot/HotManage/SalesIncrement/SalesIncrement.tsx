import React, {Fragment, useContext, useEffect, useState} from "react";
import {Empty, message, Skeleton, Space} from "antd";
import {HotContext} from "@pages/hots/Manage";
import HotQuery from "@utils/request/HotQuery";
import {getCurrentTime, getFormatTime, getTimestamp} from "@utils/TimeUtils";
import SalesDatePicker from "../SalesDatePicker";
import IncrementTable from "./IncrementTable";
import SalesPlot from "./SalesPlot";

export default function SalesIncrement(){
    const {hots_id} = useContext(HotContext)
    const [data,setData] = useState<SalesIncrement[]>([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        HotQuery.getSalesIncrementInWeek<typeof data>(hots_id,getFormatTime(getTimestamp(getCurrentTime()) - 86400 * 30,'YYYY-MM-DD'),getCurrentTime()).then(result => {
            if (result.Ok) setData(result.IncrementData || [])
            setLoading(false)
        })
    },[])

    const onFinish = (start_date:string = getFormatTime(getTimestamp(getCurrentTime()) - 86400 * 30,'YYYY-MM-DD'),end_date:string = getCurrentTime()) => {
        message.loading({content:`获取${start_date} ~ ${end_date}`,key:'loading'})
        console.log('render')
        HotQuery.getSalesIncrementInWeek<typeof data>(hots_id,start_date,end_date).then(result => {
            if (result.Ok) setData(result.IncrementData || [])
            message.destroy('loading')
        })
    }
    return (
        <Skeleton loading={loading} active style={{width:'calc(100vw - 270px)'}}>
            <tbody>
                <tr>
                    <th colSpan={Math.max(data.length + 1,6)}>
                        <Space>
                            <span>数据增长分析</span>
                            <span>统计周期:{`${data[0]?.diff_day || 0}天`}</span>
                        </Space>
                    </th>
                </tr>
                <tr>
                    <td colSpan={Math.max(data.length + 1,6)}>
                        <SalesDatePicker onFinish={onFinish}/>
                    </td>
                </tr>
                { data.length >= 1 ?
                    <Fragment>
                        <IncrementTable dataSource={data}/>
                        <tr>
                            <td colSpan={data.length + 1}>
                                <SalesDatePicker onFinish={onFinish}/>
                            </td>
                        </tr>
                        <SalesPlot dataSource={data}/>
                    </Fragment> : <Empty/>
                }
            </tbody>
        </Skeleton>
    )
}