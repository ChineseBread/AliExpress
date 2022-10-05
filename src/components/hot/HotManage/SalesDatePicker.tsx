import React from 'react';
import {Button, DatePicker, Form , Row, Select} from 'antd';
import {getCurrentTime, getFormatTime, getTimestamp} from "@utils/TimeUtils";
const {RangePicker} = DatePicker
/**
 * @description 销量对比 两种对比周期选择方式
 * @constructor
 */
interface Props{
    onFinish:(start_date?:string,end_date?:string) => void
}
function SalesDatePicker({onFinish}:Props) {

    const onRangeDateFormFinish = (range_arr:any) => {
        const start = getFormatTime(range_arr[0],'YYYY-MM-DD')
        const end = getFormatTime(range_arr[1],'YYYY-MM-DD')
        onFinish(start,end)
    }
    const onSpecificFormFinish = (date_range:number) => {
        const start = getCurrentTime()
        const end = getFormatTime(getTimestamp(getCurrentTime()) - 86400 * date_range,'YYYY-MM-DD')
        onFinish(start,end)
    }
    const onFormFinish = (value:any) => {
        const {date_range,range_arr} = value
        if (range_arr) onRangeDateFormFinish(range_arr)
        else if (date_range) onSpecificFormFinish(date_range)
        else onFinish()
    }
    return (
        <Form onFinish={onFormFinish}>
            <Row justify='space-between' style={{maxWidth:'calc(100vw - 300px)',padding:'10px 10px 0 10px',margin:'0 auto'}}>
                <Form.Item name='date_range' label='统计周期'>
                    <Select style={{width:100}} options={[1,3,7,15].map(value => ({value,label:`${value}天`}))}/>
                </Form.Item>
                <Form.Item name='range_arr' label='统计范围'>
                    <RangePicker style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{width:90}} block type='primary' htmlType='submit'>查找</Button>
                </Form.Item>
                <Form.Item>
                    <Button style={{width:90}} block type='default' htmlType='reset'>清空</Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default React.memo(SalesDatePicker,() => true);