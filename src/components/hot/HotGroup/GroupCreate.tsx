import {Button, Col, Form, Input, Row} from 'antd';
import React from "react";

/**
 * @description 创建一个爆品组
 * @param props
 * @constructor
 */
interface Props{
    onFinish:(value:{hots_name:HotGroup['hots_name'],hots_intro:HotGroup['hots_intro']}) => void
}
function GroupCreate({onFinish}:Props) {
    return (
        <Form onFinish={onFinish}>
            <Row gutter={[20,0]}>
                <Col span={5}>
                    <Form.Item name='hots_name' label='爆品组名称' rules={[{required:true,message:'请输入名称'}]}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <Form.Item name='hots_intro' label='爆品介绍' rules={[{required:true,message:'请输入介绍'}]}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Row gutter={[10,0]}>
                    <Col>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>创建</Button>
                        </Form.Item>
                    </Col>
                    <Col>
                        <Form.Item>
                            <Button type='default' htmlType='reset'>清空</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Row>
        </Form>
    )
}

export default React.memo(GroupCreate,() => true);