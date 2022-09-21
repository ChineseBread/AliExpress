import {ColumnsType} from "antd/es/table";
import {Image, Space, Table,Typography} from "antd";
const {Text} = Typography
/**
 * @description 单间列表
 * @constructor
 */
const columns:ColumnsType<HotGroupItemSku> = [
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
function ItemList({skus}:{skus:HotGroupItemSku[]}) {
    return (
        <Table
            columns={columns}
            dataSource={skus}
            pagination={false}
            rowKey={record => record.sku_id}
        />
    )
}

export default ItemList;