import {useContext, useEffect, useState} from "react";
import {Button, Form, message, Upload, Image} from "antd";
import type {UploadChangeParam} from 'antd/es/upload/interface';
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import {ShopFormContext} from "@pages/Shops/ShopUpload";
import ShopsQuery from "@utils/request/ShopsQuery";
interface WatermarkUploadProps {
    locale: 'sp' | 'ru' | 'us' | 'es' | 'fr' | 'de' | 'br' | 'ua' | 'default',
    title:string,
    WatermarkList:Array<{name:string,type:string,preview:string}>
}
export default function WatermarkUpload({locale,title,WatermarkList}:WatermarkUploadProps){
    const [form] = Form.useForm()
    const {shop_num} = useContext(ShopFormContext)
    useEffect(() => {
        const fieldsValue = WatermarkList.map(({type,preview}) => ({name:type,value:preview}))
        form.setFields(fieldsValue)
    },[WatermarkList])
    return (
        <div className='shop-upload-col'>
            <div>{title}</div>
            <Form form={form} name={`upload-form-${locale || 'default'}`} disabled={!shop_num}>
                <Form.Item label='1.png' name='1' rules={[{required:true,message:'请上传文件'}]}>
                    <UploadItem name='1' locale={locale}/>
                </Form.Item>
                <Form.Item label='2.png' name='2'>
                    <UploadItem name='2' locale={locale}/>
                </Form.Item>
                <Form.Item label='3.png' name='3'>
                    <UploadItem name='3' locale={locale}/>
                </Form.Item>
                <Form.Item label='4.png' name='4'>
                    <UploadItem name='4' locale={locale}/>
                </Form.Item>
                <Form.Item label='5.png' name='5'>
                    <UploadItem name='5' locale={locale}/>
                </Form.Item>
                <Form.Item label='xq1.png' name='xq1'>
                    <UploadItem name='xq1' locale={locale}/>
                </Form.Item>
                <Form.Item label='xq2.png' name='xq2'>
                    <UploadItem name='xq2' locale={locale}/>
                </Form.Item>
                <Form.Item label='xq3.png' name='xq3'>
                    <UploadItem name='xq3' locale={locale}/>
                </Form.Item>
                <Form.Item label='xq4.png' name='xq4'>
                    <UploadItem name='xq4' locale={locale}/>
                </Form.Item>
                <Form.Item label='xq5.png' name='xq5'>
                    <UploadItem name='xq5' locale={locale}/>
                </Form.Item>
                <Form.Item label='xq6.png' name='xq6'>
                    <UploadItem name='xq6' locale={locale}/>
                </Form.Item>
            </Form>
        </div>
    )
}
interface UploadItemProps {
    name:string
    locale:WatermarkUploadProps['locale']
    onChange?:(value:any) => void
    value?:any
}
function UploadItem({name,locale,onChange,value}:UploadItemProps){
    const {shop_num} = useContext(ShopFormContext)
    const [loading,setLoading] = useState(false)
    const [url,setUrl] = useState<string>('')
    useEffect(() => {
        setUrl(value)
    },[value])
    const beforeUpload = (file:File) => {
        const isPng = file.type === 'image/png';
        const isSize = (file.size / 1024 / 1024) < 5
        if (!isSize){
            message.error('文件大于5MB')
        }
        if (!isPng) {
            message.error(`${file.name}文件不为png格式`);
        }
        return isPng && isSize
    }
    const handleChange = (info:UploadChangeParam) => {
        if (info.file.status !== 'uploading') {
            if (info.file.response.Ok){
                message.success({content:'上传完成',key:'uploading'})
                setUrl(info.file.response.Preview)
                onTriggerChange(info.file.response.Preview)
            }else{
                message.warn({content:info.file.response.Msg,key:'uploading'})
            }
            setLoading(false)
        }else{
            setLoading(true)
        }
    }
    const onTriggerChange = (value:any) => {
        onChange?.(value)
    }
    return (
        <>
            <Upload showUploadList={false} onChange={handleChange} action={ShopsQuery.uploadDefaultWatermark(shop_num,name,locale)} beforeUpload={beforeUpload} maxCount={1} name='file'>
                <Button icon={loading ? <LoadingOutlined/> : <UploadOutlined />}>{loading ? '上传中' : (url || value) ? '已有水印' : '点击上传' }</Button>
            </Upload>
            <span className='preview-image'>
                {url && <Image width={50} height={50} src={url}/>}
            </span>
        </>
    )
}