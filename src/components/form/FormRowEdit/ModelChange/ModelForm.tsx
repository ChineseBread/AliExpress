import React, {useContext, useEffect, useState} from "react";
import {Form, message} from "antd";
import ImageDataGroup from "@components/form/FormRowEdit/ModelChange/ImageListForm";
import ModelDataGroup from "@components/form/FormRowEdit/ModelChange/ModelSelectForm";
import {ModalContext} from "@components/form/FormRowEdit/ModelFormWrapper";
import FormQuery from "@utils/request/FormQuery";
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
    const [modelData,setModelData] = useState<ModelData | undefined>(undefined)


    useEffect(() => {
        setModelData(undefined)
    },[SearchData])

    const onFormFinish = (formname:string,{forms}:any) => {
        const imageForm = forms["image-type-form"]
        const {preview_image,series_num,image} = imageForm.getFieldValue('preview-image')
        const {type_code,type_weighs,type_cost}:any = modelData
        const {shop_num}  = rowData
        if (formname === 'image-type-form'){
            //重生成数据
            if ((index === 0 || index === 4) && modelData) {
                message.loading({key:'loading',content:'重生成行数据中...'})
                FormQuery.regenerateRowData(type_code,series_num,shop_num,index).then(result => {
                    if (result.Ok){
                        message.success({key:'loading',content:'生成完成'})
                        rowData = Object.assign(rowData,result.Data)
                    }else {
                        message.warn({key:'loading',content:'重生成行数据失败'})
                    }
                    onFinish(data)
                })
            }else{
                //根据套图型号查找图 型号数据与套图数据结合
                rowData.skus[index] = {...rowData.skus[index],...{series_num,preview_image,weight:type_weighs,tag:type_code,price:type_cost,image}}
                onFinish(data)
            }
        }
    }

    const onFormChange = (formname:string,{forms}:any) => {
        if (formname === 'modal-data-form') {
            const form = forms[formname]
            form && setModelData(form.getFieldValue('itemType'))
        }
    }

    return (
        <Form.Provider onFormFinish={onFormFinish} onFormChange={onFormChange}>
            {modelData ? <ImageDataGroup setModelData={setModelData} ModelData={modelData}/> :
                <ModelDataGroup SearchData={SearchData}/>}
        </Form.Provider>
    )
}