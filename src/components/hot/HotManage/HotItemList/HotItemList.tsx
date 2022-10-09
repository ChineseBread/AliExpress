import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Empty, Skeleton} from 'antd';
import {HotContext} from "@pages/hots/Manage";
import HotQuery from "@utils/request/HotQuery";
import BaseInfo from './BaseInfo';
import HeaderInfo from './HeaderList/HeaderInfo';
import PriceInfo from "@components/hot/HotManage/HotItemList/PriceInfo";
function HotItemList() {
    const {hots_id} = useContext(HotContext)
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<DataItem[]>([])
    // const [modified,setModified] = useState(true)
    useEffect(() => {
        // fetch data
        HotQuery.getCombineHotGroupDataById<typeof data>(hots_id).then(result => {
            if (result.Ok) setData(result.DataList || [])
            setLoading(false)
        })
    },[])
    // const onFinish = (callback:(setData:(value:DataItem[]) => void,setModified:(modified:boolean) => void) => void):void => {
    //     callback(setData,setModified)
    // }
    return (
        <Skeleton loading={loading}active style={{width:'calc(100vw - 270px)'}}>
            <HeaderInfo dataSource={data}/>
            { data.length >= 1 ?
                <Fragment>
                    <BaseInfo dataSource={data}/>
                    <PriceInfo dataSource={data}/>
                </Fragment> : <Empty/>
            }
        </Skeleton>
    )
}

export default HotItemList;