import React, {useContext, useEffect} from 'react';
import {Button, Form, InputNumber} from "antd";
import {ModalContext} from "@components/form/FormRowEdit/ModelFormWrapper";

function ExchangeRate() {
    const [form] = Form.useForm()
    const {tableData:{rowKey,data},onFinish} = useContext(ModalContext)
    const rowData:any = data.find(ele => ele.id === rowKey)
    const onRateChange = ({exchange_rate}:any) => {
        rowData && (rowData.exchange_rate = exchange_rate)
        onFinish(data)
    }
    useEffect(() => {
        form.resetFields()
    },[rowData.exchange_rate])
    return (
        <Form form={form} onFinish={onRateChange} layout='vertical'>
            <Form.Item label='汇率' name='exchange_rate' initialValue={rowData.exchange_rate}>
                <InputNumber style={{width:'100%'}} min={0} max={100}  precision={0} addonAfter='%'/>
            </Form.Item>
            <Form.Item>
                <Button type='text' htmlType='submit' block>确认</Button>
            </Form.Item>
        </Form>
    )
}

export default ExchangeRate;