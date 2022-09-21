import {LineConfig} from "@ant-design/plots/es/components/line";
// const {Line} = await import('@ant-design/plots')
import {Line} from "@ant-design/plots";

/**
 * @description 销量增长折线图
 * @param props
 * @constructor
 */
function IncrementPlots({data}:{data:Array<{item_id:string,data:IncrementalData[]}>}) {
    const getData = ():Array<{date:string,quantity:number,category:string}> => {
        let result:Array<{date:string,quantity:number,category:string}> = []
        data.forEach(({data:IncrementDataList}) => {
            IncrementDataList.forEach(({from,item_id,data:{daily_sales}}) => {
                result.push({date:from,category:`商品:${item_id}`,quantity:daily_sales})
            })
        })
        return result
    }
    const config:LineConfig = {
        data:getData(),
        xField: 'date',
        yField: 'quantity',
        seriesField: 'category',
        height:200
    };
    return <div style={{marginBottom:20}}><Line {...config} /></div>;
}

export default IncrementPlots;