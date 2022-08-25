import React, {useCallback, useState} from 'react';
import {Form, FormInstance, message} from "antd";
import MajorForm from '@components/Shops/MajorForm';
import WatermarkUpload from "@components/Shops/WatermarkUpload"
import ShopsQuery from "@utils/request/ShopsQuery";
import debounce from "@utils/debounce";
interface Watermark{
    default:Array<{name:string,type:string,preview:string}>,
    locales:Array<{locale:string,files:Array<{name:string,type:string,preview:string}>}>
}
const ShopFormContext = React.createContext<{shop_num:number | undefined}>({shop_num:undefined})
const initialWatermark:Watermark['default'] = [...Array.from({length:5}).map((_,index:number) => ({name:String(index + 1),type:String(index + 1),preview:''})),...Array.from({length:6}).map((_,index:number) => ({name:`xq${index + 1}`,type:`xq${index + 1}`,preview:''}))]
//店铺上传
function ShopUpload() {
    console.log('render')
    const [ShopNum,setShopNum] = useState<number | undefined>()
    const [Watermark,setWatermark] = useState<Watermark>({default:[],locales:[]})
    const onFormFinish = (forname:string,{forms}:any) => {
        if (forname === 'submit-form') {
            let form:FormInstance = forms['submit-form']
            form.validateFields().then(result => {
                setWatermark({default:initialWatermark,locales:[{locale:'br',files:initialWatermark},{locale:'fr',files:initialWatermark},{locale:'sp',files:initialWatermark}]})
                message.loading({key:'loading',content:'获取水印'})
                ShopsQuery.getWatermark(ShopNum).then((result:any) => {
                    if (result.Ok){
                        const defaultWatermark = result.WatermarkList.default
                        const localeWatermark = result.WatermarkList.locales
                        setWatermark({default:defaultWatermark,locales:localeWatermark})
                        message.destroy('loading')
                    }else{
                        message.warn({key:'loading',content:result.Msg || '未找到该店铺水印数据'})
                    }
                })
            }).catch(e => {})
        }
    }
    const onShopNumChange = useCallback(debounce((shop_num:number) => {
        setShopNum(shop_num)
    },400),[])
    return (
        <div className='shop-upload-container'>
            <Form.Provider onFormFinish={onFormFinish}>
                <ShopFormContext.Provider value={{shop_num:ShopNum}}>
                    <MajorForm onShopNumChange={onShopNumChange}/>
                    <WatermarkUpload WatermarkList={Watermark.default} title='默认水印' locale='default'/>
                    <WatermarkUpload WatermarkList={Watermark.locales.find(({locale}) => locale.indexOf('sp') !== -1)?.files || []} title='西班牙' locale='sp'/>
                    <WatermarkUpload WatermarkList={Watermark.locales.find(({locale}) => locale.indexOf('fr') !== -1)?.files || []} title='法国' locale='fr'/>
                    <WatermarkUpload WatermarkList={Watermark.locales.find(({locale}) => locale.indexOf('sp') !== -1)?.files || []} title='巴西' locale='br'/>
                </ShopFormContext.Provider>
            </Form.Provider>
        </div>
    )
}
export {ShopFormContext}
export default ShopUpload;