/**
 * @description 表单编辑
 */
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PrevTableColumn, SkuItem} from "@type/PrevTable";
import {message, Table, Image, Button, Modal, Space} from "antd";
import {ColumnsType} from "antd/es/table";
import ModelFormWrapper from "@components/Form/FormRowEdit/ModelFormWrapper";
import PrevTableFormDataStorage from "@utils/PrevTableFormDataStorage";
import FormQuery from "@utils/request/data/FormQuery";

export default function FormEdit(){
    const navigator = useNavigate()
    const {prevTableData}:any = PrevTableFormDataStorage.getData() || {prevTableData:null}
    const [data,setData] = useState<PrevTableColumn[]>(prevTableData)

    //模态框
    const [visible,setVisible] = useState(false)
    //行key
    const [editTableData,setEditData] = useState<{rowKey:string,data:PrevTableColumn[],index?:number}>({rowKey:'',data:[]})
    const [editType,setType] = useState('')
    useEffect(() => {
        if (!prevTableData) {
            message.warn('未找到前置表格数据,请先生成前置表格')
            navigator('/form/add')
        }
    },[])

    const editRowData = (rowKey:string,operate:string,index?:number) => {
        return () => {
            if (operate !== 'model'){
                setEditData({rowKey,data})
            }else{
                setEditData({rowKey,data,index})
            }
            setType(operate)
            setVisible(true)
        }
    }

    const onFinish = (data:PrevTableColumn[]) => {
        setData(data)
        setVisible(false)
        PrevTableFormDataStorage.saveData(data)
    }

    const uploadData = () => {
        FormQuery.uploadData(data).then(result => {
            if (result.Ok){
                const {uuid} = result
                const a = document.createElement('a')
                a.href = FormQuery.downExcel(uuid) // 下载链接
                a.download = '表格数据' // 设置 download 属性告诉浏览器执行下载操作，可赋值文件名
                a.click()
            }else{
                message.warn(result.Msg)
            }
        })
    }
    function skuItem(value:SkuItem,rowKey:string,index:number){
        const {preview_image,tag,weight,price} = value || {preview_image:'',tag:'无型号',weight:0,price:0}
        const onClick = preview_image ? editRowData(rowKey,'model',index) : () => {message.warn('当前sku无数据')}
        return(
            <div className='sku-item' >
                <Image height={48} width={48} src={preview_image}/>
                <div className='sku-item-info editable-cell' onClick={onClick}>
                    <span>{tag}</span>
                    <span>{`${price}元`}</span>
                    <span>{`0.${weight}kg`}</span>
                </div>
            </div>
        )
    }
    const columns:ColumnsType<PrevTableColumn> = [
        {
            title:'商品编码',
            dataIndex:'id',
            render:id => id,
            width:70,
            fixed:'left'
        },
        {
            title:'主推商品',
            dataIndex:'skus',
            render:(value,{id},index) => skuItem(value[0],id,index),
            width:130,
        },
        ...(Array.from({length:9}).map((_,index) => ({title:index === 3 ? '搭配商品' : `sku${index + 2}`,dataIndex:'skus',render:(value:SkuItem,{id}:PrevTableColumn) => skuItem(value[index + 1],id,index + 1),width:130}))),
        {
            title:'标题',
            dataIndex:'title',
            render:(value,{id}) => <span className='data-cell editable-cell' onClick={editRowData(id,'title')}>{value || '暂无数据'}</span>,
            width:200,
        },
        {
            title:'运费模板',
            dataIndex:'shopping_template',
            render:(value,{id}) => <span className='data-cell editable-cell' onClick={editRowData(id,'template')}>{value.weight ? `${value.name} | ${value.weight}g` : '暂无数据'}</span>,
            width:150
        },
        {
            title:"汇率",
            dataIndex:'exchange_rate',
            render:(name,{id}) => <span className='editable-cell' onClick={editRowData(id,'exchange_rate')}>{`${name}%`}</span>,
            width:70,
        },
        {
            title:"利润率",
            dataIndex:'profit_rate',
            render:(name,{id}) => <span className='editable-cell' onClick={editRowData(id,'profit_rate')}>{`${name}%`}</span>,
            width:70,
        },
        {
            title:"折扣",
            dataIndex:'sales_count',
            render:(name,{id}) => <span className='editable-cell' onClick={editRowData(id,'sales_count')}>{`${name}%`}</span>,
            width:70,
        },
    ]

    return (
        <div className='form-edit-container'>
            <Button onClick={uploadData} type='default'>下载数据</Button>
            <Table
                scroll={{x:'calc(100vw - 200px)'}}
                dataSource={data}
                pagination={false}
                columns={columns}
                rowKey={record => record.id}
            />
            <Modal  style={{ top: 40 }} transitionName='' visible={visible} footer={null} onCancel={() => setVisible(false)}>
                <ModelFormWrapper onFinish={onFinish} tableData={editTableData} editType={editType}/>
            </Modal>
        </div>
    )
}
