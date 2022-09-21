/**
 * @description Stage 通用组件
 */
import React from 'react';
import {Divider, Spin, Statistic,Result} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

function StageWrapper({StatisticData,FooterData,loading,error:{Msg,isError}}:StageWrapperProps) {
    return (
        <div className='console-stage-item box-shadow'>
            {loading ? <Spin size='large'/> :
            !isError ?  <>
                    <StageStatistic {...StatisticData}/>
                    <Divider/>
                    <StageFooter {...FooterData}/>
                </> : <Result title={Msg} icon={<InfoCircleOutlined />}/>
            }
        </div>
    )
}
function StageStatistic({StageName,total,lastUpdate}:StageData['StatisticData']){
    return (
        <>
            <Statistic title={StageName} value={total}/>
            <div>{lastUpdate}</div>
        </>
    )
}
function StageFooter({title,label}:StageData['FooterData']){
    return (
        <div className='stage-footer'>
            <span>{title}</span>
            <span>{label}</span>
        </div>
    )
}
export default StageWrapper;