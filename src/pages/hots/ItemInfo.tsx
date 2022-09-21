/**
 * @description 单件详细数据
 * @constructor
 */
import {Fragment, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Empty, message} from "antd";
import HotQuery from "@utils/request/HotQuery";
import DetailDescription from "@components/hot/GoodDetail/DetailDescription";
import StoreDescription from "@components/hot/GoodDetail/StoreDescription";
import FreightList from "@components/hot/GoodDetail/FreightList";
import ItemList from "@components/hot/GoodDetail/ItemList";

type Item = {item_id:string,data:HotItem & {good_images:string[]} & {store:HotGroupShopInfo} & {skus:HotGroupItemSku[]} & {shipping:Domain[]}}
function ItemInfo() {
    const {item_id} = useParams()
    const navigator = useNavigate()
    const [data,setData] = useState<Item['data']>()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        if (!item_id){
            message.warn('未找到商品id')
            navigator('/manage')
        }else{
            HotQuery.getGoodDetail<Item>(item_id).then(result => {
                if (result.Ok) setData(result.GoodDetail?.data)
                setLoading(false)
            })
        }
    },[])
    return (
        <Card loading={loading} title={`商品:${item_id}`} className='hot-items-info-container' extra={[<Button key='1' onClick={() => navigator(-1)}>返回</Button>]}>
            {data ? <Fragment>
                <Card title='商品详情' bordered={false} type='inner'>
                    <DetailDescription {...data}/>
                </Card>
                <Card title='商店详情' bordered={false} type='inner'>
                    <StoreDescription {...data.store}/>
                </Card>
                <Card title='运费详情' bordered={false} type='inner'>
                    <FreightList list={data.shipping}/>
                </Card>
                <Card title='单件列表' bordered={false} type='inner'>
                    <ItemList skus={data.skus}/>
                </Card>
            </Fragment> : <Empty/>}
        </Card>
    )
}

export default ItemInfo;