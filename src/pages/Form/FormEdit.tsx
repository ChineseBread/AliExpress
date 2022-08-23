/**
 * @description 表单编辑
 */
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {message, Table, Image, Button, Modal, Tooltip, Popover} from "antd";
import {ColumnsType} from "antd/es/table";
import ModelFormWrapper from "@components/Form/FormRowEdit/ModelFormWrapper";
import PrevTableFormDataStorage from "@utils/PrevTableFormDataStorage";
import FormQuery from "@utils/request/FormQuery";

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

    const uploadData = useCallback(() => {
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
    },[])
    const skuItem = useCallback((value:SkuItem,rowKey:string,index:number) => {
        const {preview_image,tag,weight,price,series_num} = value || {preview_image:'',tag:'无型号',weight:0,price:0}
        const onClick = preview_image ? editRowData(rowKey,'model',index) : () => {message.warn('当前sku无数据')}
        return(
            <Popover placement='top' title={null} content={<PopoverPreview {...value}/>}>
                <div className='sku-item' >
                    <Image preview={false} height={55} width={55} src={preview_image}/>
                    <div className='sku-item-info editable-cell' onClick={onClick}>
                        <Tooltip title={tag}>
                            <span>{tag}</span>
                        </Tooltip>
                        <span>{`${price}元`}</span>
                        <span>{`${weight / 1000}kg`}</span>
                        <span>{`P${series_num}`}</span>
                    </div>
                </div>
            </Popover>
        )
    },[])
    const PopoverPreview = useCallback(({preview_image,tag,weight,price}:SkuItem) => {
        return (
            <div style={{textAlign:'center'}}>
                <Image src={preview_image} preview={false} width={220} height={220}/>
                <div>{tag}</div>
                <div>{price}/{weight / 1000}</div>
            </div>
        )
    },[])

    const columns:ColumnsType<PrevTableColumn> = [
        {
            title:'商品编码',
            dataIndex:'id',
            render:(id,record,index) => index + 1,
            width:70,
            fixed:'left'
        },
        ...(Array.from({length:10}).map((_,index) => ({title:`sku${index + 1}`,dataIndex:'skus',render:(value:SkuItem[],{id}:PrevTableColumn) => skuItem(value[index],id,index),width:130,className:`sku-border ${(index == 0 || index == 4) ? 'sku-obvious' : ""}`}))),
        {
            title:'标题',
            dataIndex:'title',
            render:(value,{id}) => <Tooltip title={value}><span className='data-cell editable-cell' onClick={editRowData(id,'title')}>{value || '暂无数据'}</span></Tooltip>,
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
            {useMemo(() => {
               return <Modal width={1200} style={{ top: 40 }} transitionName='' visible={visible} footer={null} onCancel={() => setVisible(false)}>
                   <ModelFormWrapper onFinish={onFinish} tableData={editTableData} editType={editType}/>
               </Modal>
            },[visible])}
        </div>
    )
}
