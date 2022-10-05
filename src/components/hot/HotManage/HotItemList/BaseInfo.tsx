import { Image, Space ,Typography ,Tooltip } from "antd"
import {getTimeFromNow} from "@utils/TimeUtils";
const {Text} = Typography
type Props = {
    dataSource:DataItem[]
    // onFinish:(callback:(setData:(value:DataItem[]) => void,setModified:(modified:boolean) => void) => void) => void
}

//基础信息
const columns:Column<DataItem>[] = [
    {
        title:'商品编码',
        dataIndex:'',
        render:(value,{data:{item_id}},index) => item_id
    },
    {
      title:'商品名称',
      dataIndex:'',
      render:(value,{data:{title},index}) => <Tooltip mouseEnterDelay={0.5} title={title}><Text ellipsis style={{maxWidth:150}}>{title}</Text></Tooltip>
    },
    {
        title:'上架时间',
        dataIndex:'',
        render:(value,{data:{date}},index) => <Space><span>{date}</span><span>{getTimeFromNow(date)}</span></Space>
    },
    {
        title:'商品评分',
        dataIndex:'',
        render:(value,{data:{rate}},index) => rate
    },
    {
        title:'商品收藏',
        dataIndex:'',
        render:(value,{data:{wished,orders}},index) => <Space><span>{wished}</span><span>({(orders / (wished === 0 ? 1 : wished)).toFixed(2)})</span></Space>
    },
    {
        title:'商品订单',
        dataIndex:'',
        render:(value,{data:{orders,rate}},index) => <Space><span>{orders}</span><span>({(rate / (orders === 0 ? 1 : orders)).toFixed(2)})</span></Space>
    },
    {
        title:'',
        dataIndex:'',
        render:(value,{data:{good_images}},index) => `详情图片共${good_images.length}张`
    },
    {
        title:'详情图片',
        dataIndex:'',
        render:(value,{data:{good_images}},index) => <Space direction='vertical'>{good_images.slice(0,5).map(url => <Image key={url} src={url} width={120} height={120}/>)}</Space>
    }
]
export default function BaseInfo({dataSource}:Props){
    return(
        <tbody>
            <tr>
                <th colSpan={dataSource.length + 1}>详情信息</th>
            </tr>
            {columns.map(({title,dataIndex,render}) => {
                return <tr key={title}>
                    <td className='column-title-cell'>
                        {title}
                    </td>
                    {dataSource.map((record,index) => {
                        return <td className='column-data-cell' key={record.item_id}>
                            {render ? render(record[dataIndex],record,index) : record[dataIndex]}
                        </td>
                    })}
                </tr>
            })}
        </tbody>
    )
}