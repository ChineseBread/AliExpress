/**
 * @description 控制台总商品数
 * @present 展示上次更新前的总商品数 及 昨日更新数
 */
import {useEffect, useState} from "react";
import StageWrapper from "./StageWrapper.js";
import StageOverviewQuery from "@utils/request/data/StageOverviewQuery";

export default function GoodsStage(){
    const [loading,setLoading] = useState<statusType['loading']>(true)
    const [error,setError] = useState<statusType['error']>({Msg:'',isError:false})
    const [data,setData] = useState<StageData>({StatisticData:{StageName:'',total:0,lastUpdate:''},FooterData:{title:'',label:''}})
    useEffect(() => {
        StageOverviewQuery.getGoodsOverview().then(result => {
            if (result.Ok){
                const {OverViewData:{total,last_update,update_num}} = result
                setData({
                    StatisticData:{
                        StageName:'总商品数',
                        total,
                        lastUpdate:last_update
                    },
                    FooterData:{
                        title:'昨日更新',
                        label:update_num
                    }
                })
            }else{
                setError({
                    isError:true,
                    Msg:result.Msg || '获取数据失败'
                })
            }
            setLoading(false)
        })
    },[])
    return (
        <StageWrapper
            loading={loading}
            error={error}
            StatisticData={data.StatisticData}
            FooterData={data.FooterData}
        />
    )
}