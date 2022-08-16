//全局默认分页表页数
import {ColumnsType} from "antd/es/table";
import {GoodsData} from "@type/DataType";
import {Image} from "antd";
import {getTimestamp} from "@utils/TimeUtils";

const globalPageOptions = {
    pageSizeOptions:[30,50,100,200,500],
    showQuickJumper:true
    // hideOnSinglePage:true
}
const GoodsListDefaultColumns: ColumnsType<GoodsData> = [
    {
        title: '商品编码',
        dataIndex: 'good_id',
        render: name => name,
    },
    {
        title: '商品名称',
        dataIndex: 'good_name',
        render:name => name,
        width:700
    },
    {
        title: '商品图片',
        dataIndex: 'good_image',
        render:url => <Image width={80} height={80} src={url}/>
    },
    {
        title:'更新时间',
        dataIndex:'lastupdate',
        render:name => name,
        sorter:(a,b) => getTimestamp(a.lastupdate) - getTimestamp(b.lastupdate)
    }
]
export {globalPageOptions,GoodsListDefaultColumns}