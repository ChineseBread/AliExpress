import {Button, Form, Input, Radio, Slider} from "antd";
import React, {useContext} from "react";
import {ModalContext} from "@components/Form/FormRowEdit/ModelFormWrapper";
type props = {
    onSearch:  (value:SearchData) => void,
}
export default function ModelSearch({onSearch}:props){
    const {tableData:{rowKey,data}} = useContext(ModalContext)
    const rowData = data.find(ele => ele.id === rowKey)
    let max = (rowData?.sku1_weight || 0) + 20
    return(
        <Form layout='vertical' onFinish={onSearch}>
            <Form.Item label='型号查找' name='keyword'>
                <Input style={{width:'100%'}} placeholder='默认全部'/>
            </Form.Item>
            <Form.Item label='类型筛选' initialValue='全部' name='cate' rules={[{required: true, message: '请选择类型'}]}>
                <Radio.Group>
                    <Radio value='上身'>上身</Radio>
                    <Radio value='下身'>下身</Radio>
                    <Radio value='手铐'>手铐</Radio>
                    <Radio value='面具'>面具</Radio>
                    <Radio value='套装'>套装</Radio>
                    <Radio value='项链'>项链</Radio>
                    <Radio value='项圈'>项圈</Radio>
                    <Radio value='待分'>待分</Radio>
                    <Radio value='全部'>全部</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label={`克重范围(${0} ~ ${max})`} initialValue={[0,max]} name='weight_range' rules={[{required: true, message: '请选择克重范围'}]}>
                <Slider range min={0} max={max}/>
            </Form.Item>
            <Form.Item>
                <Button block type='default' htmlType='submit'>筛选</Button>
            </Form.Item>
        </Form>
    )
}