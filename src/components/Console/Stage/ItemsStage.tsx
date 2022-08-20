/**
 * @description 单件数据
 */
import {useEffect, useState} from "react";
import StageOverviewQuery from "@utils/request/StageOverviewQuery";
import StageWrapper from "@components/Console/Stage/StageWrapper";

export default function ItemsStage(){
    const [loading,setLoading] = useState<statusType['loading']>(true)
    const [error,setError] = useState<statusType['error']>({Msg:'',isError:false})
    const [data,setData] = useState<StageData>({StatisticData:{StageName:'',total:0,lastUpdate:''},FooterData:{title:'',label:''}})
    useEffect(() => {
        StageOverviewQuery.getItemsOverview().then(result => {
            if (result.Ok){
                const {OverViewData:{total,last_update,update_num}} = result
                setData({
                    StatisticData:{
                        StageName:'总单件数',
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