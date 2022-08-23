import {Button, Form, Radio, Row, Image, Spin, Empty, Popover} from "antd";
import React, {useCallback, useContext, useEffect, useState} from "react";
import FormQuery from "@utils/request/FormQuery";
import {ModalContext} from "@components/Form/FormRowEdit/ModelFormWrapper";
type props = {
    ModelData:ModelData | undefined,
    setModelData:(value:ModelData | undefined) => void
}
export default function ImageDataGroup({setModelData,ModelData}:props){
    const {tableData:{rowKey,data,index = 0}} = useContext(ModalContext)
    const {shop_num,skus}:any = data.find(ele => ele.id === rowKey)
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(false)
    const [groups,setGroups] = useState<{id:string,preview_image:string,series_num:number}[]>([])
    const [total,setTotal] = useState(0)
    const {type_code,type_cost,type_weighs}:any = ModelData
    useEffect(() => {
        setGroups([])
    },[skus[index]])
    useEffect(() => {
        if (!ModelData) return;
        setLoading(true)
        FormQuery.getImageListByModal(shop_num,type_code).then(result => {
            if (result.Ok){
                const {ImageList = [],total = 0} = result
                setTotal(total)
                setGroups(ImageList)
                setHasMore(ImageList.length < total)
                setPage(2)
            }
            setLoading(false)
        })
    },[ModelData])
    const backToModelData = () => {
        setModelData(undefined)
    }
    const getMoreData = () => {
        if (!ModelData) return
        setLoading(true)
        FormQuery.getImageListByModal(shop_num,type_code,12,page).then(result => {
            if (result.Ok){
                const {ImageList = [],total = 0} = result
                setGroups(groups => [...groups,...ImageList])
                setHasMore(groups.length + ImageList.length < total)
                setPage(page => page + 1)
            }
            setLoading(false)
        })
    }
    const PopoverPreview = useCallback(({preview_image}:any) => {
        return (
            <div style={{textAlign:'center'}}>
                <Image src={preview_image} preview={false} width={220} height={220}/>
                <div>{type_code}</div>
                <div>{type_cost}/{type_weighs / 1000}</div>
            </div>
        )
    },[])
    return (
        <>
            {loading ? <Spin/> : groups.length >= 1 ? <Form layout='vertical' name='image-type-form'>
                <Form.Item label={`选择套图 : 共有${total}个套图`} name='preview-image' rules={[{required:true,message:'请选择一个类型'}]}>
                    <Radio.Group>
                        {groups.map(({preview_image,id,series_num}) => {
                            return <Popover placement='top' key={id} title={null} content={<PopoverPreview preview_image={preview_image}/>}>
                                <Radio key={id} value={{preview_image,series_num}}>
                                    <div key={id} className='model-radio-item'>
                                        <div className='model-tag'>{type_code.substring(0,11)}</div>
                                        <div className='model-info'>
                                            <Image height={60} width={60} src={preview_image} preview={false}/>
                                            <div>
                                                <div className='model-info-item'>{`${type_cost}`}</div>
                                                <div className='model-info-item'>{`${type_weighs / 1000}`}</div>
                                                <div className='model-info-item'>{`P${series_num}`}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Radio>
                            </Popover>
                        })}
                    </Radio.Group>
                </Form.Item>
                <Row>
                    <Button style={{width:'50%'}} type='text' onClick={backToModelData}>返回</Button>
                    <Button style={{width:'50%'}} type='text' disabled={!hasMore} onClick={getMoreData}>更多</Button>
                </Row>
                <Form.Item><Button type='primary' htmlType='submit' block>确认修改</Button></Form.Item>
            </Form> : <Empty/>}
        </>
    )
}