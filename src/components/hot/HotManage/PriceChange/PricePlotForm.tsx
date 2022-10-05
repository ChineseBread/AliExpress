import {Form, Space , Image} from 'antd';
import React, {useEffect} from 'react';
type Props = {
    dataSource:DateShipping[]
    onFinish:(item_id:string) => void
}

/**
 * @description 运费选择表单
 * @constructor
 */
function PricePlotForm({dataSource,onFinish}:Props) {
    const [form] = Form.useForm()
    const item_id = Form.useWatch('item_id',form)
    useEffect(() => {
        item_id && onFinish(item_id)
    },[item_id])
    return (
        <Form form={form}>
            <Form.Item name='item_id' label='单品选择'>
                <ImageSelect ItemList={dataSource.map(({item_id,good_image}) => ({item_id,url:good_image}))}/>
            </Form.Item>
        </Form>
    )
}
type SelectProps = {
    value?:HotItem['item_id']
    onChange?:(value:HotItem['item_id']) => void
    ItemList:Array<{item_id:HotItem['item_id'],url:string}>
}
function ImageSelect({onChange,ItemList}:SelectProps){
    const onTriggerChange = (value:HotItem['item_id']) => onChange?.(value)
    const onClick = (item_id:HotItem['item_id']) => {
        return () => onTriggerChange(item_id)
    }
    return <Space wrap>
        {ItemList.map(({item_id,url}) => <Image style={{cursor:'pointer'}} src={url} key={item_id} height={50} width={50} preview={false} onClick={onClick(item_id)}/>)}
    </Space>
}
export default PricePlotForm;