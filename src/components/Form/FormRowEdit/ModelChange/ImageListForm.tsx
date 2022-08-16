import {Button, Form, Radio, Row, Image, Spin, Empty} from "antd";
import React, {useContext, useEffect, useState} from "react";
import FormQuery from "@utils/request/data/FormQuery";
import {ModalContext} from "@components/Form/FormRowEdit/ModelFormWrapper";
type props = {
    ModalData:ModalData | undefined,
    setModalData:(value:ModalData | undefined) => void
}
export default function ImageDataGroup({setModalData,ModalData}:props){
    const {tableData:{rowKey,data}} = useContext(ModalContext)
    const {shop_num}:any = data.find(ele => ele.id === rowKey)
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(false)
    const [groups,setGroups] = useState<{id:string,preview:string}[]>([])

    useEffect(() => {
        if (!ModalData) return;
        const {type_code} = ModalData
        setLoading(true)
        FormQuery.getImageListByModal(shop_num,type_code).then(result => {
            if (result.Ok){
                const {ImageList = [],total = 0} = result
                setGroups(ImageList)
                setHasMore(ImageList.length < total)
                setPage(2)
            }
            setLoading(false)
        })
    },[ModalData])
    const backToModalData = () => {
        setModalData(undefined)
    }
    const getMoreData = () => {
        if (!ModalData) return
        setLoading(true)
        const {type_code} = ModalData
        FormQuery.getImageListByModal(shop_num,type_code,page).then(result => {
            if (result.Ok){
                const {ImageList = [],total = 0} = result
                setGroups(groups => [...groups,...ImageList])
                setHasMore(groups.length + ImageList.length < total)
                setPage(page => page + 1)
            }
            setLoading(false)
        })
    }
    return (
        <>
            {loading ? <Spin/> : groups.length >= 1 ? <Form name='image-type-form'>
                <Form.Item name='preview-image' rules={[{required:true,message:'请选择一个类型'}]}>
                    <Radio.Group>
                        {groups.map(({preview,id}) => <Radio key={id} value={preview}><Image src={preview} width={90} height={90}/></Radio>)}
                    </Radio.Group>
                </Form.Item>
                <Row>
                    <Button style={{width:'50%'}} type='text' onClick={backToModalData}>返回</Button>
                    <Button style={{width:'50%'}} type='text' disabled={!hasMore} onClick={getMoreData}>更多</Button>
                </Row>
                <Form.Item><Button type='primary' htmlType='submit' block>确认修改</Button></Form.Item>
            </Form> : <Empty/>}
        </>
    )
}