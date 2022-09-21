import React from 'react';
import {Descriptions, Space , Image ,Typography, Tooltip} from "antd";
const {Text} = Typography
type description = HotItem & {good_images:string[]}
type Props = {[K in keyof  description]:description[K]}
function DetailDescription({date,title,discount,orders,rate,quantity,reviews,wished,sale_amount_high,sale_amount_low,raw_amount_high,raw_amount_low,good_images}:Props) {
    return (
        <Descriptions bordered>
            <Descriptions.Item label='商品名称'>
                <Tooltip title={title} mouseEnterDelay={0.5}>
                    <Text style={{width:300}} ellipsis>{title}</Text>
                </Tooltip>
            </Descriptions.Item>
            <Descriptions.Item label='创建日期'>{date}</Descriptions.Item>
            <Descriptions.Item label='订单数'>{orders}</Descriptions.Item>
            <Descriptions.Item label='折扣'>{discount}</Descriptions.Item>
            <Descriptions.Item label='评分'>{rate}</Descriptions.Item>
            <Descriptions.Item label='销量'>{quantity}</Descriptions.Item>
            <Descriptions.Item label='浏览'>{reviews}</Descriptions.Item>
            <Descriptions.Item label='促销最高价'>{sale_amount_high}</Descriptions.Item>
            <Descriptions.Item label='促销最低价'>{sale_amount_low}</Descriptions.Item>
            <Descriptions.Item label='收藏'>{wished}</Descriptions.Item>
            <Descriptions.Item label='原最高价'>{raw_amount_high}</Descriptions.Item>
            <Descriptions.Item label='原最低价'>{raw_amount_low}</Descriptions.Item>
            <Descriptions.Item label='商品图片' contentStyle={{maxWidth:0,overflow:'auto'}}>
                <Space>
                    {good_images.map(url => <Image key={url} src={url} width={100} height={100}/>)}
                </Space>
            </Descriptions.Item>
        </Descriptions>
    )
}

export default DetailDescription;