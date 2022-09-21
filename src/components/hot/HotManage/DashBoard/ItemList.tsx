/**
 * @description 爆品组单件列表
 * @constructor
 */
import {Space, Table, Typography,Image, Card} from "antd";
import {useContext, useEffect, useState} from "react";
import {Link as RouterLink} from 'react-router-dom'
import {ColumnsType} from "antd/es/table";
import HotQuery from "@utils/request/HotQuery";
import {HotContext} from "@pages/hots/Manage";
const {Text} = Typography

interface HotGroupItem{
    item_id:string
    title:string
    skus:Array<HotGroupItemSku>
}

function ItemList() {

    const {hots_id} = useContext(HotContext)

    const [data,setData] = useState<HotGroupItem[]>([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        HotQuery.getHotGroupItemList<HotGroupItem[]>(hots_id).then(result => {
            if (result.Ok){
                const {ItemList}  = result
                setData(ItemList || [])
            }
            setLoading(false)
        })
    },[])

    const columns:ColumnsType<HotGroupItem> = [
        {
            title:'商品编码',
            dataIndex:'item_id'
        },
        {
            title:'标题',
            dataIndex:'title',
        },
        {
            title:'操作',
            dataIndex:'item_id',
            render:id => <RouterLink to={`/hot/manage/${hots_id}/${id}`}>查看</RouterLink>
        }
    ]

    const expandedRowRender = (record:HotGroupItem) => {
        const expandedColumns:ColumnsType<HotGroupItemSku> = [
            {
                title:'单件套图',
                dataIndex:'big_image',
                render:url => <Image src={url} width={50} height={50}/>
            },
            {
                title:'单件编码',
                dataIndex:'sku_id'
            },
            {
                title:'折扣',
                dataIndex:'discount',
                render:discount => `${discount}%`,
                sorter:(a, b) => a.discount - b.discount
            },
            {
                title:'销量',
                dataIndex:'quantity',
                sorter: (a, b) => a.discount - b.discount
            },
            {
                title:<Space><Text>原价</Text><Text delete>促销价</Text></Space>,
                dataIndex:'sku_raw_price',
                render:(text,record,index) => <Space><Text>{text}</Text><Text delete>{record.sku_price}</Text></Space>,
                sorter:(a, b) => a.sku_raw_price - b.sku_raw_price
            }
        ]
        return <Table dataSource={record.skus} columns={expandedColumns}/>
    }

    return (
        <Card loading={loading} title='最新商品数据' className='hot-manage-data-card'>
            <Table
                dataSource={data}
                rowKey={(record) => record.item_id}
                columns={columns}
                pagination={false}
                expandable={{expandedRowRender}}
            />
        </Card>
    )
}

export default ItemList;