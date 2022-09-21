/**
 * @description 运费详情列表
 */
import {useContext, useEffect, useState} from 'react';
import HotQuery from "@utils/request/HotQuery";
import {HotContext} from "@pages/hots/Manage";
import {Card, Empty,Image} from "antd";
import FreightTable from './FreightTable';
interface Freight {
    item_id: string
    image:string
    data:Domain[]
}

function FreightList() {
    const {hots_id} = useContext(HotContext)
    const [loading,setLoading] = useState(true)
    const [data,setData] = useState<Freight[]>([])
    useEffect(() => {
       HotQuery.getHotGroupFreight<Freight[]>(hots_id).then(result => {
           if (result.Ok) setData(result.FreightList || [])
           setLoading(false)
       })
    },[])
    return (
        <Card loading={loading} title='运费详情' className='hot-manage-data-card'>
            <div className='horizontal-list-body'>
                {data.length >= 1 ? data.map(({item_id,data,image}) => {
                    return <Card key={item_id} title={`商品:${item_id}`} type='inner' bordered={false} className='horizontal-list-item' extra={[<Image key='1' width={40} height={40} src={image}/>]}>
                        <FreightTable dataSource={data}/>
                    </Card>
                }) : <Empty style={{width:'100%'}}/>}
            </div>
        </Card>
    )
}

export default FreightList;