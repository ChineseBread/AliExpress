import React, {useContext, useEffect} from 'react';
import {Button, Form, InputNumber} from "antd";
import {ModalContext} from "@components/form/FormRowEdit/ModelFormWrapper";
//利润率修改
function ProfitRate() {
    const [form] = Form.useForm()
    const {tableData:{rowKey,data},onFinish} = useContext(ModalContext)
    const rowData:any = data.find(ele => ele.id === rowKey)
    const onRateChange = ({profit_rate}:any) => {
        rowData && (rowData.profit_rate = profit_rate)
        onFinish(data)
    }
    useEffect(() => {
        form.resetFields()
    },[rowData.profit_rate])
    return (
        <Form form={form} onFinish={onRateChange} layout='vertical'>
            <Form.Item label='利润率' name='profit_rate' initialValue={rowData.profit_rate}>
                <InputNumber style={{width:'100%'}} min={0} max={100}  precision={0} addonAfter='%'/>
            </Form.Item>
            <Form.Item>
                <Button type='text' htmlType='submit' block>确认</Button>
            </Form.Item>
        </Form>
    )
}

export default ProfitRate;