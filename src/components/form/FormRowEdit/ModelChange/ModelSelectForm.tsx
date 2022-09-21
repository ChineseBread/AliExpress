import React, {useCallback, useContext, useEffect, useState} from "react";
import FormQuery from "@utils/request/FormQuery";
import {Button, Empty, Form, Spin, Image, Popover} from "antd";
import {ModalContext} from "@components/form/FormRowEdit/ModelFormWrapper";
type props = {
    SearchData?:SearchData
}
export default function ModelDataGroup({SearchData}:props){
    const {tableData:{rowKey,data,index = 0}} = useContext(ModalContext)
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(false)
    const [groups,setGroups] = useState<ModelData[]>([])
    const [total,setTotal] = useState(0)
    const {skus}:any = data.find(ele => ele.id === rowKey)
    useEffect(() => {
        setGroups([])
    },[skus[index]])
    useEffect(() => {
        if (!SearchData) return;
        setLoading(true)
        const {cate,keyword,weight_range,order} = SearchData
        //请求数据
        const data = {cate,keyword,max_weight:weight_range[1],min_weight:weight_range[0],limit:50,page:1,order}
        FormQuery.searchItemModal(data).then(result => {
            if (!result.Ok) return;
            const {ModalGroups = [],total = 0} = result
            setGroups(ModalGroups)
            setTotal(total)
            setLoading(false)
            setHasMore(ModalGroups.length < total)
            setPage(1)
        })
    },[SearchData])
    const getMoreData = () => {
        if (!SearchData) return;
        const {cate,keyword,weight_range} = SearchData
        //请求数据
        const data = {cate,keyword,max_weight:weight_range[1],min_weight:weight_range[0],limit:50,page:page + 1}
        FormQuery.searchItemModal(data).then(result => {
            if (!result.Ok) return
            const {ModalGroups = [],total = 0} = result
            setGroups([...groups,...ModalGroups])
            setHasMore(groups.length + ModalGroups.length < total)
            setPage(page => page + 1)
        })
    }

    return (
        <>
            {loading ? <Spin/> : groups.length >= 1 ? <Form layout='vertical' name='modal-data-form'>
                <Form.Item className='model-data-wrapper' label={`选择型号 : 共有${total}个型号`} name='itemType' rules={[{required:true,message:'请选择一个类型'}]}>
                    <RadioGroups groups={groups}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{width:'100%'}} type='text' disabled={!hasMore} onClick={getMoreData}>更多</Button>
                </Form.Item>
            </Form> : <Empty/>}
        </>

    )
}
function RadioGroups({onChange,groups}:{onChange?:any,groups:ModelData[]}){

    const triggerChange = (value:any) => {
        onChange?.(value)
    }
    const onClick = (value:ModelData) => {
       return () => {
           triggerChange(value)
       }
    }
    const PopoverPreview = useCallback(({images,type_weighs,type_code,type_cost}:ModelData) => {
        return (
            <div style={{textAlign:'center'}}>
                <Image src={images[0]} preview={false} width={220} height={220}/>
                <div>{type_code}</div>
                <div>{type_cost}/{type_weighs / 1000}</div>
            </div>
        )
    },[])
    return (
        <>
            {groups.map((ele:ModelData) => {
                const {type_code,images,type_cost,type_weighs,series_num} = ele
                return <Popover mouseEnterDelay={0.5} placement='top' key={type_code} title={null} content={<PopoverPreview {...ele}/>}>
                    <div key={type_code} className='model-radio-item' onClick={onClick(ele)}>
                        <div className='model-tag'>{type_code.substring(0,11)}</div>
                        <div className='model-info'>
                            <Image height={60} width={60} src={images[0]} preview={false}/>
                            <div>
                                <div className='model-info-item'>{`${type_cost}`}</div>
                                <div className='model-info-item'>{`${type_weighs / 1000}`}</div>
                                <div className='model-info-item'>{`P${series_num}`}</div>
                            </div>
                        </div>
                    </div>
                </Popover>
            })}
        </>

    )
}