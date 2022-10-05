import React from 'react';
import {Image, Table} from "antd";
import {ColumnsType} from "antd/es/table";

/**
 * @description 单品分析表
 * @param props
 * @constructor
 */
type Props = {
    loading:boolean
    dataSource:AnalyzeItem[]
}
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
        dataIndex:'rates',
        render: value => `${value}%`
    },
    {
        title:'新',
        dataIndex:'is_new',
        render:flag => flag ? '是' : '否 '
    }
]
function AnalyzeTable({dataSource,loading}:Props) {
    return (
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            pagination={false}
        />
    )
}

export default AnalyzeTable;