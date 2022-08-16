import React, {useContext} from 'react';
import {Button, Form, Input} from "antd";
import {ModalContext} from "@components/Form/FormRowEdit/ModelFormWrapper";
const {TextArea} = Input
//标题更换
function TitleChange() {
    const {onFinish,tableData:{data,rowKey}} = useContext(ModalContext)
    const [form] = Form.useForm()
    const onTitleFinish = ({title}:any) => {
        let rowData:any = data.find(ele => ele.id === rowKey)
        rowData.title = title
        onFinish(data)
        form.resetFields()
    }
    return (
        <div className='title-form-container'>
            <Form form={form} layout='vertical' onFinish={onTitleFinish}>
                <Form.Item name='title' label='标题'>
                    <TextArea autoSize placeholder='输入标题' showCount maxLength={128}/>
                </Form.Item>
                <Form.Item>
                    <Button type='default' htmlType='submit'>确认</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default TitleChange;