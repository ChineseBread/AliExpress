import React from 'react';
import {Button, Form, Input, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
//店铺上传
function ShopUpload() {
    return (
        <div className='shop-upload-container'>
            <Form.Provider>
                <MajorForm/>
                <UploadCol title='默认水印' formName='default_watermark'/>
                <UploadCol title='西班牙' formName='spanish'/>
                <UploadCol title='法国' formName='french'/>
                <UploadCol title='巴西' formName='brazil'/>
            </Form.Provider>

        </div>
    )
}
function MajorForm(){
    const [form] = Form.useForm()
    return (
        <div className='shop-upload-col'>
            <Form form={form} name='marjor-form' layout='vertical'>
                <Form.Item label='店铺编号'>
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button style={{width:'100%'}} type='default' htmlType='submit'>完成上传</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
function UploadCol({title,formName}:any){
    const [form] = Form.useForm()
    return (
        <div className='shop-upload-col'>
            <div>{title}</div>
            <Form layout='vertical' form={form} name={formName}>
                {Array.from({length:11}).map((_,index) => {
                    return (
                        <Form.Item name={`${formName}${index + 1}`} key={`${formName}${index + 1}`}>
                            <Upload>
                                <Button icon={<UploadOutlined />}>选择文件</Button>
                            </Upload>
                        </Form.Item>
                    )
                })}

            </Form>
        </div>
    )
}
export default ShopUpload;