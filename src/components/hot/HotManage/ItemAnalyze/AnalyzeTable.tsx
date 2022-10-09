import React from 'react';
import {Image, message, Space, Table ,Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import HotQuery from "@utils/request/HotQuery";
const {Link} = Typography
/**
 * @description 单品分析表
 * @param props
 * @constructor
 */
type Props = {
    item_id:HotItem['item_id']
    loading:boolean
    dataSource:AnalyzeItem[]
}

function AnalyzeTable({item_id,dataSource,loading}:Props) {
    const columns:ColumnsType<AnalyzeItem> = [
        {
            title:'单品编码',
            dataIndex:'sku_id'
        },
        {
            title:'图片',
            dataIndex:'big_image',
            render:url => <Image src={url} width={50} height={50}/>
        },
        {
            title:'价格',
            dataIndex:'sku_price'
        },
        {
            title:'销量',
            dataIndex:'orders'
        },
        {
            title:'占比',
            dataIndex:'rate',
            render: value => `${value}%`
        },
        {
            title: '是否为最新',
            dataIndex: 'is_new',
            render: flag => flag ? '是' : '否 '
        },
        {
            title:'操作',
            dataIndex:"sku_id",
            render:sku_id => <Space>
                <Link onClick={setAsFirstImageItem(sku_id)}>设为首图单品</Link>
                <Link onClick={setAsSameItem(sku_id)}>设为相同单品</Link>
            </Space>
        }
    ]
    const setAsFirstImageItem = (sku_id:AnalyzeItem['sku_id']) => {
        return () => {
            HotQuery.setAsFirstImageItem(item_id,sku_id).then(result => {
                message[result.Ok ? 'success' : 'warn'](result.Msg)
            })
        }
    }
    const setAsSameItem = (sku_id:AnalyzeItem['sku_id']) => {
        return () => {
            HotQuery.setAsSameItem(item_id,sku_id).then(result => {
                message[result.Ok ? 'success' : 'warn'](result.Msg)
            })
        }
    }
    return (
        <Table
            rowKey={record => record.sku_id}
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
        />
    )
}

export default AnalyzeTable;