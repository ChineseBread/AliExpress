import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Empty, Input, message, Space, Spin} from "antd";
import {ModalContext} from "@components/Form/FormRowEdit/ModelFormWrapper";
import debounce from "@utils/debounce";
import FormQuery from "@utils/request/FormQuery";
//标题更换
function TitleChange() {
    const {onFinish,tableData:{data,rowKey}} = useContext(ModalContext)
    const rowData:any = data.find(ele => ele.id === rowKey)
    const [loading,setLoading] = useState(true)
    const [title,setTitle] = useState('')
    const [words,setWords] = useState<Array<{cate:string,data:Array<{word_id:string,word_cate:string,word_content:string,createtime:string}>}>>([])
    const WordsSet = useRef(new Set<string>())
    const onTitleFinish = () => {
        let rowData:any = data.find(ele => ele.id === rowKey)
        rowData.title = title
        onFinish(data)
    }
    useEffect(() => {
        setTitle(rowData.title)
    },[rowData])
    useEffect(() => {
       FormQuery.getTitleTemplate().then((result:any) => {
           if (result.Ok){
               setWords(result.TitleTemplate)
           }else{
               message.warn('获取标题模板失败')
           }
           setLoading(false)
       })
    },[])
    const getRandomTitle = debounce(() => {
        message.loading({key:'loading',content:'生成标题中'})
        FormQuery.getRandomTitle(rowData.skus[0].cate).then(result => {
            if (result.Ok) {
                const {RandomTitle = []} = result
                setTitle(RandomTitle[0].title || '')
                message.destroy('loading')
            }else {
                message.warn({key:'loading',content:'生成失败'})
            }
        })
    },500)
    const onChange = ({target}:any) => {
      setTitle(target.value)
    }
    const resetTitle = () => {
        WordsSet.current.clear()
        setTitle('')
    }
    const addTitle = (word:string,word_id:string) => {
       return () => {
           setTitle(title => {
               const value = `${title} ${word}`
               if (value.length < 128){
                    WordsSet.current.add(word_id)
                    return value
               }
               return title
           })
       }
    }
    return (
        <div className='title-form-container'>
            <Space direction='vertical'>
                <Space>
                    <Input name='title' value={title} onChange={onChange} style={{width:1020}} placeholder='输入标题' showCount maxLength={128}/>
                    <Button type='default' onClick={resetTitle}>清空</Button>
                    <Button type='default' onClick={getRandomTitle}>换一换</Button>
                </Space>
                {useMemo(() => {
                    return loading ? <Spin/> : words.length >= 1 ? <Space direction='vertical' className='title-templates-container'>
                        {words.map(({cate,data}) => {
                            return <div key={cate} className='title-template'>
                                <div>
                                    {cate}
                                </div>
                                <div>
                                    {data.map(({word_content,word_id}) => {
                                        return <span onClick={addTitle(word_content,word_id)} key={word_id} className={`title-template-item ${WordsSet.current.has(word_id) ? 'title-template-item-selected' : ''}`}>{word_content}</span>
                                    })}
                                </div>
                            </div>
                        })}
                    </Space> : <Empty/>
                },[loading,words,WordsSet.current.size])}
            </Space>
            <Button onClick={onTitleFinish} block type='text'>确认</Button>
        </div>
    )
}

export default TitleChange;