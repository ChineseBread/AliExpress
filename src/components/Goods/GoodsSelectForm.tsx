import React from 'react';
import {Form, DatePicker, Input, Select, Button, Row,Col} from "antd";
import {getCurrentTime, getFormatTime} from "@utils/TimeUtils";
import dayjs from "dayjs";
const {RangePicker} = DatePicker
const {Option} = Select
//商品筛选
function GoodsSelectForm({setValue}:any) {
    const [form] = Form.useForm()
    const onFinish = ({shop_type,date_type,dateRange,order}: any) => {
        const date_start = dateRange ? getFormatTime(dateRange[0],'YYYY-MM-DD') : '1970-01-01'
        const date_end = dateRange ? getFormatTime(dateRange[1],'YYYY-MM-DD') : getCurrentTime()
        setValue({
            shop_type:shop_type || 'all',
            date_type,
            order,
            date_start,
            date_end
        })
    }
    return (
        <div className='select-header'>
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Form.Item name="shop_type" label="店铺编码">
                    <Input placeholder='默认为全部店铺' />
                </Form.Item>
                <Row gutter={[20,0]}>
                    <Col span={8}>
                        <Form.Item initialValue='range' rules={[{required:true,message:'请选择时间范围'}]} name="date_type" label="时间范围">
                            <Select>
                                <Option value="range">自定义范围</Option>
                                <Option value="3day">3天内</Option>
                                <Option value="1week">1周内</Option>
                                <Option value="2week">2周内</Option>
                                <Option value="1month">1月内</Option>
                                <Option value="6month">6月内</Option>
                                <Option value="1year">1年内</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item name="dateRange" initialValue={[dayjs(getFormatTime(Date.now() / 1000 - 31536000,'YYYY-MM-DD')),dayjs(getCurrentTime())]} label="日期" rules={[({ getFieldValue }) => ({
                            validator(_, value) {
                                if (getFieldValue('date_type') === 'range' && !value) return Promise.reject('请选择时间范围')
                                return Promise.resolve()
                            },
                        })]}>
                            <RangePicker />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="order" initialValue='all' label="查询方式">
                            <Select>
                                <Option value="all">全部</Option>
                                <Option value="orders">订单</Option>
                                <Option value="reviews">浏览量</Option>
                                <Option value="rate">评分</Option>
                                <Option value="likes">点赞数</Option>
                                <Option value="price">价格</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Row gutter={[20,0]} justify='end'>
                     <Col>
                        <Button type='primary' htmlType='submit'>查询</Button>
                     </Col>
                     <Col>
                        <Button type='default' htmlType='reset'>清空</Button>
                     </Col>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    )
}

export default GoodsSelectForm;