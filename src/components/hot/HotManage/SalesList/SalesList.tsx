/**
 * @description 销量数据图 根据日期统计
 * @constructor
 */
import React, {useContext, useEffect, useState} from 'react';
import {Card, Empty, message} from 'antd';
import {HotContext} from "@pages/hots/Manage";
import HotQuery from "@utils/request/HotQuery";
import {getCurrentTime} from "@utils/TimeUtils";
import SalesDatePicker from "@components/hot/HotManage/SalesList/SalesDatePicker";
import SalesTable from './SalesTable';
import SalesPlots from './SalesPlots';

function SalesList() {
    const {hots_id} = useContext(HotContext)
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<SalesData[]>([])

    useEffect(() => {
        HotQuery.getHotGroupByDate<SalesData[]>(hots_id,getCurrentTime('YYYY-MM-DD')).then(result => {
            if (result.Ok) setData(result.SalesList || [])
            setLoading(false)
        })
    },[])

    const onFinish = (start_date:string,end_date:string) => {
        message.loading({key:'loading',content:'查询中'})
        HotQuery.getHotGroupByDate<SalesData[]>(hots_id,end_date,start_date).then(result => {
            if (result.Ok) {
                setData(result.SalesList || [])
                message.destroy('loading')
            }else{
                message.warn({key:'loading',content:'查找失败'})
            }

        })
    }

    return (
        <Card loading={loading} title='销量对比' className='hot-manage-data-card'>
            <SalesDatePicker onFinish={onFinish}/>
            {data.length >= 1 && <SalesPlots data={data}/>}
            <div className='horizontal-list-body'>
                {data.length >= 1 ? data.map(({date,list}) => {
                    return <Card key={date} title={date} type='inner' bordered={false} className='horizontal-list-item'>
                        <SalesTable dataSource={list}/>
                    </Card>
                }) : <Empty style={{width:'100%'}}/>}
            </div>
        </Card>
    )
}

export default SalesList;