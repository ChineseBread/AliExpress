/**
 * @description 爆品销量对比
 * @constructor
 */
import React, {useContext, useEffect, useState} from 'react';
import {Card, Empty} from 'antd';
import {HotContext} from "@pages/hots/Manage";
import HotQuery from "@utils/request/HotQuery";
import IncrementTable from "@components/hot/HotManage/Increment/IncrementTable";
import IncrementPlots from './IncrementPlots';

function SalesIncrement(){
    const {hots_id} = useContext(HotContext)
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<Array<{item_id:string,data:IncrementalData[]}>>([])
    useEffect(() => {
       HotQuery.getSalesIncrementInWeek<Array<{item_id:string,data:IncrementalData[]}>>(hots_id).then(result => {
           if (result.Ok) setData(result.IncrementData || [])
           setLoading(false)
       })
    },[])
    return (
        <Card loading={loading} title='一周内增长' className='hot-manage-data-card'>
            {data.length >= 1 && <IncrementPlots data={data}/>}
            <div className='horizontal-list-body'>
                {data.length >= 1 ? data.map(({item_id,data:list}) => {
                    return <Card type='inner' key={item_id} title={`商品:${item_id}`} bordered={false} className='horizontal-list-item'>
                        <IncrementTable dataSource={list}/>
                    </Card>
                }) : <Empty style={{width:'100%'}}/>}
            </div>
        </Card>
    );
};

export default SalesIncrement;