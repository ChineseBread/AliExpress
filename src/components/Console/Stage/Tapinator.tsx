/**
 * @description 断更数据
 */
import {useEffect, useState} from "react";
import StageOverviewQuery from "@utils/request/data/StageOverviewQuery";
import StageWrapper from "@components/Console/Stage/StageWrapper";
import {getCurrentTime} from "@utils/TimeUtils";

export default function Tapinator(){
    const [loading,setLoading] = useState<statusType['loading']>(true)
    const [error,setError] = useState<statusType['error']>({Msg:'',isError:false})
    const [data,setData] = useState<StageData>({StatisticData:{StageName:'',total:0,lastUpdate:''},FooterData:{title:'',label:''}})
    useEffect(() => {
        StageOverviewQuery.getTapinatorOverview().then(result => {
            if (result.Ok){
                const {OverViewData:{total,rate}} = result
                setData({
                    StatisticData:{
                        StageName:'疑似断更',
                        total,
                        lastUpdate:getCurrentTime()
                    },
                    FooterData:{
                        title:'断更占比',
                        label:`${rate}%`
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