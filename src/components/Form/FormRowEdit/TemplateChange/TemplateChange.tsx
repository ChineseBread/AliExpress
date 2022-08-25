import React, {useCallback, useContext, useEffect, useState} from 'react';
import {Button, Form, Select, Spin} from "antd";
import {ModalContext} from "@components/Form/FormRowEdit/ModelFormWrapper";
import FormQuery from "@utils/request/FormQuery";
import debounce from "@utils/debounce";
//运费模板更换
function TemplateChange() {
    const {tableData:{rowKey,data},onFinish} = useContext(ModalContext)
    const [form] = Form.useForm()
    const onTemplateFinish = ({template}:any) => {
        let rowData:any = data.find(ele => ele.id === rowKey)
        const {weight,name} = JSON.parse(template)
        rowData.shopping_template = {weight,name}
        onFinish(data)
    }
    return (
        <div className='template-form-container'>
            <Form form={form} onFinish={onTemplateFinish} layout='vertical'>
                <Form.Item label='运费模板' name='template'>
                    <SelectTemplate/>
                </Form.Item>
                <Form.Item>
                    <Button type='default' htmlType='submit'>确认</Button>
                </Form.Item>
            </Form>
        </div>
    )
}
function SelectTemplate({onChange}:any){
    const {tableData:{rowKey,data}} = useContext(ModalContext)
    const {shop_num}:any = data.find(ele => ele.id === rowKey)
    const [loading,setLoading] = useState(true)
    const [options,setOptions] = useState<Array<{label:string,value:string}>>([])
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(false)
    const [keyword,setKeyword] = useState('')
    useEffect(() => {
        fetchData()
    },[])
    const triggerChange = (value:string) => {
        onChange?.(value);
    };

    const fetchData = () => {
        setLoading(true)
        FormQuery.getCarriageTemplate(page,10,shop_num,keyword).then(result => {
            if (!result.Ok) return
            const {Templates = [],total = 0} = result
            setOptions([...options,...Templates.map(({name,weight}) => ({label:`${name} | ${weight / 1000}kg`,value:JSON.stringify({weight,name})}))])
            setHasMore(total > Templates.length + options.length)
            setPage(page => page + 1)
            setLoading(false)
        })
    }
    const CustomRender = (menu:any) => {
        return (
            <>
                {menu}
                <Button block onClick={fetchData} disabled={!hasMore} type='text'>更多</Button>
            </>
        )
    }
    const debounceFetcher = useCallback(debounce((value:string) => {
        setOptions([]);
        setLoading(true);
        setHasMore(false)
        FormQuery.getCarriageTemplate(1,20,shop_num,value).then(result => {
            if (!result.Ok) return;
            const {Templates = [],total = 0} = result
            setOptions([...Templates.map(({name,weight}) => ({label:`${name} | 0.${weight}kg`,value:JSON.stringify({weight,name})}))])
            setHasMore(total > Templates.length + options.length)
            setKeyword(value)
            setPage(2)
            setLoading(false)
        });
    },500),[])
    return (
        <Select
            onChange={triggerChange}
            showSearch
            onSearch={debounceFetcher}
            dropdownRender={CustomRender}
            notFoundContent={loading ? <Spin size="small" /> : null}
            options={options}
        />
    )
}

export default TemplateChange;