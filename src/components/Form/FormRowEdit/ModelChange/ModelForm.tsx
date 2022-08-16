import React, {useContext, useEffect, useState} from "react";
import {Form, message} from "antd";
import ImageDataGroup from "@components/Form/FormRowEdit/ModelChange/ImageListForm";
import ModalDataGroup from "@components/Form/FormRowEdit/ModelChange/ModelSelectForm";
import {ModalContext} from "@components/Form/FormRowEdit/ModelFormWrapper";
import FormQuery from "@utils/request/data/FormQuery";
type props = {
    SearchData:SearchData | undefined
}
/**
 * @description 确定查找的数据后显示套图的类型
 * @param SearchData
 * @constructor
 */
export default function ModelForm({SearchData}:props){
    const {tableData:{rowKey,data,index = 0},onFinish} = useContext(ModalContext)
    let rowData:any = data.find(ele => ele.id === rowKey)
    const [groups,setGroups] = useState<ModalData[]>([])
    const [modalData,setModalData] = useState<ModalData | undefined>(undefined)
    useEffect(() => {
        setModalData(undefined)
    },[SearchData])
    const onFormFinish = (formname:string,{forms}:any) => {
        if (formname === 'modal-data-form') {
            setModalData(forms[formname].getFieldValue('itemType'))
        }
        if (formname === 'image-type-form'){
            //重生成数据
            if (index === 0 || index === 5) {
                FormQuery.regenerateRowData(rowData.shop_num).then(result => {
                    if (result.Ok){
                        const {Data:{skus}} = result
                        let sku1 = skus[0]
                        let sku6 = skus[5]
                        rowData = Object.assign(rowData,{skus,sku1_weight: sku1.weight,sku1_cost: sku1.price,sku6_weight: sku6.weight,sku6_cost: sku6.price})
                    }else {
                        message.warn('重生成行数据失败')
                    }
                    onFinish(data)
                })
            }else{
                const preview_image = forms['image-type-form'].getFieldValue('preview-image')
                const {type_code:tag,type_weighs:weight,type_cost:price}:any = modalData
                rowData.skus[index] = {...rowData.skus[index],...{preview_image,weight,tag,price}}
                onFinish(data)
            }
        }
    }
    return (
        <Form.Provider onFormFinish={onFormFinish}>
            {modalData ? <ImageDataGroup setModalData={setModalData} ModalData={modalData}/> :
                <ModalDataGroup groups={groups} setGroups={setGroups} SearchData={SearchData}/>}
        </Form.Provider>
    )
}