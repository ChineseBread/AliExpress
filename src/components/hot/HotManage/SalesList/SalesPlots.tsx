/**
 * @description 单件销量数据折线图
 * @constructor
 */
// const {Line} = await import('@ant-design/plots')
import { Line } from '@ant-design/plots';
import {LineConfig} from "@ant-design/plots/es/components/line";
function SalesPlots({data}:{data:SalesData[]}) {
    const getData = ():Array<{date:string,quantity:number,category:string}> => {
        let result:Array<{date:string,quantity:number,category:string}> = []
        data.forEach(({list}) => {
            list.forEach(({item_id,date,quantity}) => {
                result.push({category:`商品:${item_id}`,date,quantity})
            })
        })
        return result
    }
    const config:LineConfig = {
        data:getData(),
        xField: 'date',
        yField: 'quantity',
        seriesField: 'category',
        height:300
    };
    return <div style={{marginBottom:20}}><Line {...config} /></div>;
}

export default SalesPlots;