import React, {useContext, useEffect} from 'react';
import {Button, Form, InputNumber} from "antd";
import {ModalContext} from "@components/form/FormRowEdit/ModelFormWrapper";

function Discount() {
    const [form] = Form.useForm()
    const {tableData:{rowKey,data},onFinish} = useContext(ModalContext)
    const rowData:any = data.find(ele => ele.id === rowKey)
    const onRateChange = ({sales_count}:any) => {
        rowData && (rowData.sales_count = sales_count)
        onFinish(data)
    }
    useEffect(() => {
        form.resetFields()
        // console.log(rowData.sales_count)
    },[rowData.sales_count])
    return (
        <Form form={form} onFinish={onRateChange} layout='vertical'>
            <Form.Item label='折扣' name='sales_count' initialValue={rowData.sales_count}>
                <InputNumber style={{width:'100%'}} min={0} max={100}  precision={0} addonAfter='%'/>
            </Form.Item>
            <Form.Item>
                <Button type='text' htmlType='submit' block>确认</Button>
            </Form.Item>
        </Form>
    )
}

export default Discount;