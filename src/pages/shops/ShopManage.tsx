import {Button, message, Table} from 'antd';
import React, {useEffect, useState} from 'react';
import {ColumnsType} from "antd/es/table";
import ShopsQuery from "@utils/request/ShopsQuery";
import {useNavigate} from "react-router-dom";
import debounce from "@utils/debounce";
//店铺管理

function ShopManage() {
    const navigator = useNavigate()
    const [data,setData] = useState<ShopStatistics[]>([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
       ShopsQuery.getShopStatisticsList().then(result => {
           if (result.Ok) {
               setData(result.ShopsList || [])
               setLoading(false)
           }
       })
    },[])
    const columns:ColumnsType<ShopStatistics> = [
        {
            title:'店铺编号',
            dataIndex:'shop_num',
            render:id => id,
        },
        {
            title:'系列号数量',
            dataIndex:'series_count',
            render:id => id
        },
        {
            title:'型号数量',
            dataIndex:'tags_count',
            render:id => id
        },
        {
            title:'套图数量',
            dataIndex:'images_count',
            render:id => id
        },
        {
            title:'操作',
            dataIndex:'shop_num',
            render:id => <Button type='text' onClick={updateWatermark(id)}>更新水印</Button>,
            width:300
        }
    ]
    const updateWatermark = (shop_num:number) => {
        return debounce(() => {
            ShopsQuery.updateShopWatermark(shop_num).then(result => {
                if (!result.Ok){
                    message.warn('更新失败')
                    return
                }
                const {status} = result
                if (status === 'created') message.success('更新中')
                if (status === 'running') message.info('已创建更新任务')
            })
        },100)
    }
    const checkImage = () => {
        ShopsQuery.revalidateImage().then(result => {
            if (!result.Ok){
                message.warn('检查失败')
                return
            }
            const {status} = result
            if (status === 'created') message.success('检查中')
            if (status === 'running') message.info('已创建检查任务')
        })
    }
    const updateShopData = () => {
        ShopsQuery.recountShopStatistics().then(result => {
            if (!result.Ok){
                message.warn('更新失败')
                return
            }
            const {status} = result
            if (status === 'created') message.success('更新中')
            if (status === 'running') message.info('已创建更新任务')
        })
    }
    return (
        <div className='shop-manage-container'>
            <div className='shop-manage-operation'>
                <Button type='default' onClick={() => navigator('/shop/watermark')}>编辑店铺水印</Button>
                <Button type='default' onClick={checkImage}>检测图片</Button>
                <Button type='default' onClick={updateShopData}>更新店铺数据</Button>
            </div>
            <Table
                loading={loading}
                pagination={false}
                rowKey={record => record.shop_num}
                dataSource={data}
                columns={columns}
            />
        </div>
    )
}

export default ShopManage;