import React, { Fragment } from "react";
import {Button, Col, DatePicker, Form, Row, Select} from 'antd';
import {getFormatTime} from "@utils/TimeUtils";
const {RangePicker} = DatePicker
/**
 * @description 销量对比 两种对比周期选择方式
 * @constructor
 */
interface Props{
    onFinish:(...value:any) => void
}
function SalesDatePicker({onFinish}:Props) {

    const onRangeDateFormFinish = (value:any) => {
      const {range_arr} = value
        const start = getFormatTime(range_arr[0],'YYYY-MM-DD')
        const end = getFormatTime(range_arr[1],'YYYY-MM-DD')
        onFinish(start,end)
    }
    const onSpecificFormFinish = (value:any) => {
        const {start_date,date_range} = value
        const start = getFormatTime(start_date,'YYYY-MM-DD')
        const end = getFormatTime((start_date.unix() + 86400 * date_range),'YYYY-MM-DD')
        onFinish(start,end)
    }

    return (
        <Fragment>
            <Row>
                <Form style={{width:'100%'}} name='specific-date-picker' onFinish={onSpecificFormFinish}>
                    <Row style={{width:'100%',padding:'0 150px',margin:'0 auto'}} justify='space-between'>
                        <Form.Item style={{width:300}} name='start_date' label='开始日期' rules={[{required:true,message:'请选择起始日期'}]}>
                            <DatePicker style={{width:'100%'}}/>
                        </Form.Item>
                        <Form.Item style={{width:200}} name='date_range' label='统计周期' rules={[{required:true,message:'请选择统计周期'}]}>
                            <Select style={{width:'100%'}} options={[1,3,7,15].map(value => ({value,label:`${value}天`}))}/>
                        </Form.Item>
                        <Row style={{width:200}} justify='space-between'>
                            <Form.Item>
                                <Button style={{width:90}} block type='primary' htmlType='submit'>提交</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{width:90}} block type='default' htmlType='reset'>清空</Button>
                            </Form.Item>
                        </Row>
                    </Row>
                </Form>
            </Row>
            <Row>
                <Form style={{width:'100%'}} name='range-date-picker' onFinish={onRangeDateFormFinish}>
                    <Row style={{width:'100%',padding:"0 150px",margin:'0 auto'}} justify='space-between'>
                        <Form.Item name='range_arr' label='统计范围' rules={[{required:true,message:'请选择时间范围'}]}>
                            <RangePicker style={{width:'100%'}}/>
                        </Form.Item>
                        <Row style={{width:200}} justify='space-between'>
                            <Form.Item>
                                <Button style={{width:90}} block type='primary' htmlType='submit'>提交</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{width:90}} block type='default' htmlType='reset'>清空</Button>
                            </Form.Item>
                        </Row>
                    </Row>
                </Form>
            </Row>
        </Fragment>
    )
}

export default React.memo(SalesDatePicker,() => true);