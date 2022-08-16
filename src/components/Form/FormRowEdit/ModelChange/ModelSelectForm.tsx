import React, {useEffect, useState} from "react";
import FormQuery from "@utils/request/data/FormQuery";
import {Button, Empty, Form, Radio, Row, Spin} from "antd";
type props = {
    groups:ModalData[]
    setGroups:(value:ModalData[]) => void
    SearchData?:SearchData
}
export default function ModalDataGroup({groups,setGroups,SearchData}:props){
    const [loading,setLoading] = useState(false)
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(false)
    useEffect(() => {
        if (!SearchData) return;
        setLoading(true)
        const {cate,keyword,weight_range} = SearchData
        //请求数据
        const data = {cate,keyword,max_weight:weight_range[1],min_weight:weight_range[0],limit:12,page:1}
        FormQuery.searchItemModal(data).then(result => {
            if (!result.Ok) return;
            const {ModalGroups = [],total = 0} = result
            setGroups(ModalGroups)
            setLoading(false)
            setHasMore(ModalGroups.length < total)
            setPage(1)
        })
    },[SearchData])
    const getMoreData = () => {
        if (!SearchData) return;
        const {cate,keyword,weight_range} = SearchData
        //请求数据
        const data = {cate,keyword,max_weight:weight_range[1],min_weight:weight_range[0],limit:12,page:page + 1}
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
            {loading ? <Spin/> : groups.length >= 1 ? <Form name='modal-data-form'>
                <Form.Item name='itemType' rules={[{required:true,message:'请选择一个类型'}]}>
                    <Radio.Group>
                        {groups.map((modalData:ModalData) => {
                            return (
                                <Radio key={modalData.type_code} value={modalData}>
                                    <div className='radio-item'>
                                        <span>{modalData.type_code}</span>
                                        <span>{`${modalData.type_cost}元`}</span>
                                        <span>{`${modalData.type_weighs}g`}</span>
                                    </div>
                                </Radio>
                            )
                        })}
                    </Radio.Group>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Button style={{width:'50%'}} type='text' htmlType='submit'>查找套图</Button>
                        <Button style={{width:'50%'}} type='text' disabled={!hasMore} onClick={getMoreData}>更多</Button>
                    </Row>
                </Form.Item>
                <Form.Item><Button type='primary' htmlType='submit' block>确认修改</Button></Form.Item>
            </Form> : <Empty/>}
        </>

    )
}