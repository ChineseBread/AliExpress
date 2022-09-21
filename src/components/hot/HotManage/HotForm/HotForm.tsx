/**
 * @description 设置竞品 爆品
 */
import {useContext} from "react";
import {HotContext} from "@pages/hots/Manage";
import {Button, Col, Form, Input, message, Row} from "antd";
import HotQuery from "@utils/request/HotQuery";

export default function HotForm(){
    const {hots_id} = useContext(HotContext)
    //爆品设置
    const onHotFormFinish = (value:any) => {
        const {item_id} = value
        HotQuery.setItemAsHotItem(hots_id,item_id).then(result => message.info(result.Msg))
    }
    //竞品设置
    const onCompeteFormFinish = (value:any) => {
        const {item_id} = value
        HotQuery.setItemAsCompeteItem(hots_id,item_id).then(result => message.info(result.Msg))
    }
    return(
        <Row justify='space-evenly' className='hot-manage-row-form' style={{padding:'12px 0',margin:0,height:50}}>
            <Form style={{width:500}} onFinish={onHotFormFinish}>
                <Row justify='space-evenly' gutter={[10,0]}>
                    <Col span={15}>
                        <Form.Item label='链接编码' name='item_id'>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            <Button block type='default' htmlType='submit'>设置爆品</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Form style={{width:500}} onFinish={onCompeteFormFinish}>
                <Row justify='space-evenly' gutter={[10,0]}>
                    <Col span={15}>
                        <Form.Item label='爆品编码' name='item_id'>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item>
                            <Button block type='default' htmlType='submit'>添加竞品</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Row>
    )
}