//决定商店号并提交表单
import {Button, Form, InputNumber} from "antd";
import React, {useContext, useEffect} from "react";

export default function MajorForm({onShopNumChange}:any){
    const [form] = Form.useForm()
    const shop_num = Form.useWatch('shop_num',form)
    useEffect(() => {
        onShopNumChange(shop_num)
    },[shop_num])
    return (
        <div className='shop-upload-col'>
            <Form form={form} name='submit-form' layout='vertical'>
                <Form.Item name='shop_num' rules={[{required:true,message:'请输入店铺编号'}]} label='店铺编号'>
                    <InputNumber style={{width:'100%'}}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{width:'100%'}} type='default' htmlType='submit'>列出水印</Button>
                </Form.Item>
            </Form>
        </div>
    )
}