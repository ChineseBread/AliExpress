import React, {useContext, useEffect, useState} from 'react';
import {Button, Form, Row, Select, Spin} from "antd";
import HotQuery from "@utils/request/HotQuery";
import {HotContext} from "@pages/hots/Manage";

/**
 * @description
 * @param props
 * @constructor
 */
type Props = {
    // fetch selected item data
    onFinish:(item_id:HotItem['item_id']) => void
}
function ItemForm({onFinish}:Props) {
    const {hots_id} = useContext(HotContext)
    const [form] = Form.useForm()
    const [options,setOptions] = useState<Array<{value:HotItem['item_id'],label:HotItem['item_id']}>>([])
    const [loading,setLoading] = useState(true)
    useEffect(() => {
        HotQuery.getCombineHotGroupDataById<DataItem[]>(hots_id).then(result => {
            if (result.Ok) setOptions((result.DataList || []).map(({item_id}) => ({value:item_id,label:item_id})))
            setLoading(false)
        })
    },[])

    // const doSetAction = (callback:(item_id:HotItem['item_id']) => Promise<Result<any>>) => {
    //     return () => {
    //         form.validateFields().then(({item_id}) => {
    //             callback.call(HotQuery,item_id).then(result => message[result.Ok ? 'success' : 'warn'](result.Msg))
    //         }).catch(() => {})
    //     }
    // }
    //选择单品
    const beginSelect = () => {
        form.validateFields().then(({item_id}) => onFinish(item_id)).catch(e => {})
    }

    return (
        <Form form={form} >
            <Row justify='space-evenly' style={{maxWidth:'calc(100vw - 300px)',margin:'0 auto'}}>
                <Form.Item name='item_id' label='开始选择' rules={[{required:true,message:'请选择单件编号'}]}>
                    <Select style={{width:150}} options={options} notFoundContent={loading ? <Spin/> : null}/>
                </Form.Item>
                <Form.Item>
                    <Button type='default' onClick={beginSelect}>开始选择</Button>
                </Form.Item>
               {/* <Form.Item>
                    <Button type='default' onClick={doSetAction(HotQuery.setAsFirstImageItem)}>设为首图单品</Button>
                </Form.Item>
                <Form.Item>
                    <Button type='default' onClick={doSetAction(HotQuery.setAsSameItem)}>设为相同单品</Button>
                </Form.Item>*/}
            </Row>
        </Form>
    )
}

export default React.memo(ItemForm,() => true);