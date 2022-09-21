/**
 * @description 上传表单 根据上传信息生成一个新的列表
 */
import {Button, Col, Form, InputNumber, message, Row, Select} from "antd";
import {useNavigate} from "react-router-dom";
import ShopType from "@components/form/FormUpload/ShopType";
import PrevTableFormDataStorage from "@utils/PrevTableFormDataStorage";
import FormQuery from "@utils/request/FormQuery";
const {Option} = Select
export default function FormUpload(){
    const navigator = useNavigate()
    const [form] = Form.useForm()
    const onFinish = (value:any) => {
        message.loading({key:'loading',content:'请稍后',duration:20})
        FormQuery.getTablePrevList(value).then(result => {
            if (result.Ok){
                const {profit_rate,exchange_rate,sales_count,shop_num,price_method} = value
                let {PrevTableData = [],RandomTitles = []} = result
                PrevTableData = PrevTableData.map((data,index) => ({...data,price_method,title:RandomTitles[index].title,shopping_template:{},shop_num,profit_rate,exchange_rate,sales_count}))
                PrevTableFormDataStorage.saveData(PrevTableData)
                navigator('/form/edit')
                message.destroy('loading')
            }else{
                message.warn({key:'loading',content:'前置表格数据获取失败'})
            }
        })
    }
    return (
        <div className='form-add-container'>
            <Form
                layout='vertical'
                size='large'
                form={form}
                onFinish={onFinish}
            >
                <Form.Item label='店铺选择' name='shop_num' rules={[{required:true,message:'请选择店铺号'}]}>
                    <ShopType/>
                </Form.Item>
                <Form.Item label='产品数量' name='goods_num' rules={[{required:true,message:'请输入产品数量'}]}>
                    <InputNumber style={{width:'100%'}} min={1} max={100} precision={0}/>
                </Form.Item>
                <Form.Item label='利润率' name='profit_rate' initialValue={20}>
                    <InputNumber style={{width:'100%'}} precision={0} max={100} min={0} addonAfter='%'/>
                </Form.Item>
                <Form.Item label='汇率' name='exchange_rate' initialValue={0}>
                    <InputNumber style={{width:'100%'}} addonAfter='%'/>
                </Form.Item>
                <Form.Item label='折扣' name='sales_count' initialValue={50}>
                    <InputNumber style={{width:'100%'}} precision={0} max={100} min={0} addonAfter='%'/>
                </Form.Item>
                <Form.Item label='定价方式' name='price_method' initialValue='fixed'>
                    <Select>
                        <Option key='fixed'>区域定价计算器(利润率)</Option>
                        <Option key='dynamic'>智能定价计算器</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='套图是否使用过' name='image_used' initialValue='all'>
                    <Select>
                        <Option value='all'>全部图片</Option>
                        <Option value='only'>使用过的图片</Option>
                        <Option value='no'>未使用过的图片</Option>
                    </Select>
                </Form.Item>
              {/*  <form.Item label='未使用套图/全部套图' name='series_num' rules={[{required:true,message:'请选择图片类型,如不存在图片类型请先选择店铺号'}]}>
                    <ImageCate ShopId={selectValue}/>
                </form.Item>*/}
                <Form.Item>
                    <Row gutter={[20,0]}>
                        <Col>
                            <Button htmlType='submit' type='primary'>查询</Button>
                        </Col>
                        <Col>
                            <Button htmlType='reset' type='default'>清空</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </div>
    )
}