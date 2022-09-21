import React, {useContext, useEffect} from "react";
import {Button, Col, Form, Input, Radio, Row, Slider, Switch} from "antd";
import {ModalContext} from "@components/form/FormRowEdit/ModelFormWrapper";
type props = {
    onSearch:  (value:SearchData) => void,
}
export default function ModelSearch({onSearch}:props){
    const {tableData:{rowKey,data,index = 0}} = useContext(ModalContext)
    const {sku1_weight,skus}:any = data.find(ele => ele.id === rowKey)
    let max = (sku1_weight || 0) + 20
    const [form] = Form.useForm()
    useEffect(() => {
        form.resetFields()
    },[skus[index]])
    return(
        <Form layout='vertical' form={form} onFinish={onSearch}>
           <Row gutter={[50,0]}>
               <Col span={10}>
                   <Form.Item label='型号查找' name='keyword'>
                       <Input placeholder='默认全部'/>
                   </Form.Item>
                   <Form.Item label={`克重范围(${0} ~ ${max})`} initialValue={[0,max]} name='weight_range' rules={[{required: true, message: '请选择克重范围'}]}>
                       <Slider range min={0} max={max}/>
                   </Form.Item>
               </Col>
               <Col span={12}>
                   <Form.Item label='类型筛选' initialValue='全部' name='cate' rules={[{required: true, message: '请选择类型'}]}>
                       <Radio.Group>
                           <Radio style={{width:100}} value='上身'>上身</Radio>
                           <Radio style={{width:100}} value='下身'>下身</Radio>
                           <Radio style={{width:100}} value='手铐'>手铐</Radio>
                           <Radio style={{width:100}} value='面具'>面具</Radio>
                           <Radio style={{width:100}} value='套装'>套装</Radio>
                           <Radio style={{width:100}} value='项链'>项链</Radio>
                           <Radio style={{width:100}} value='项圈'>项圈</Radio>
                           <Radio style={{width:100}} value='待分'>待分</Radio>
                           <Radio style={{width:100}} value='全身'>全身</Radio>
                           <Radio style={{width:100}} value='全部'>全部</Radio>
                       </Radio.Group>
                   </Form.Item>
               </Col>
               <Col>
                   <Form.Item label='排序' name='order' initialValue={true}>
                       <Switch unCheckedChildren="默认" checkedChildren="最新" defaultChecked/>
                   </Form.Item>
               </Col>
           </Row>
            <Form.Item>
                <Button block type='default' htmlType='submit'>筛选</Button>
            </Form.Item>
        </Form>
    )
}