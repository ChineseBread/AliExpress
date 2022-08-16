/**
 * @define 定义控制台组件信息
 */
declare type StageData = {
    StatisticData:{
        StageName:string,
        total:number,
        lastUpdate:string
    },
    FooterData:{
        title:string,
        label:string
    }
}
declare type statusType = {
    loading:boolean,
    error:{
        Msg:string,
        isError:boolean
    }
}
declare type StageWrapperProps = StageData & statusType