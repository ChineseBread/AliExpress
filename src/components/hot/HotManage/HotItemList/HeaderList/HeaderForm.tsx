import {Button, DatePicker, Form, Input, message, Row} from 'antd';
import {getFormatTime} from "@utils/TimeUtils";
import {useContext} from "react";
import {HotContext} from "@pages/hots/Manage";
import HotQuery from '@utils/request/HotQuery';

/**
 * @description 头部表单 用于设置国家和采集国家信息
 * @constructor
 */
function HeaderForm() {
    const [form] = Form.useForm()
    const {hots_id} = useContext(HotContext)
    const doAddAction = (callback:(hots_id:HotGroup['hots_id'],item_id:string,date:string) => Promise<Result<any>>) => {
        return () => {
            form.validateFields().then(({item_id,date}) => {
                callback.call(HotQuery,hots_id,item_id,getFormatTime(date,'YYYY-MM-DD')).then(result => message[result.Ok ? 'success' : 'warn'](result.Msg))
            }).catch(() => {})
        }
    }
    return (
        <Form title='采集商品' form={form}>
            <Form.Item label='商品编码' name='item_id' rules={[{required:true,message:'请输入商品编码'}]}>
                <Input style={{width:100}}/>
            </Form.Item>
            <Form.Item label='上架时间' name='date' rules={[{required:true,message:'请选择上架时间'}]}>
                <DatePicker style={{width:100}}/>
            </Form.Item>
            <Row justify='space-evenly'>
                <Form.Item>
                    <Button type='default' onClick={doAddAction(HotQuery.setItemAsMajorHotItem)}>加入主爆品</Button>
                </Form.Item>
                <Form.Item>
                    <Button type='default' onClick={doAddAction(HotQuery.setItemAsSecondaryHotItem)}>加入次爆品</Button>
                </Form.Item>
            </Row>
            <Row justify='space-evenly'>
                <Form.Item>
                    <Button type='default' onClick={doAddAction(HotQuery.setItemAsMajorCompeteItem)}>加入主竞品</Button>
                </Form.Item>
                <Form.Item>
                    <Button type='default' onClick={doAddAction(HotQuery.setItemAsSecondaryCompeteItem)}>加入次竞品</Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default HeaderForm;