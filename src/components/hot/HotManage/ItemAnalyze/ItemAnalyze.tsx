import React, {useState} from 'react';
import HotQuery from "@utils/request/HotQuery";
import ItemForm from './ItemForm';
import AnalyzeTable from './AnalyzeTable';

/**
 * @description 单品分析
 * @constructor
 */
function ItemAnalyze() {
    const [data,setData] = useState<AnalyzeItem[]>([])
    const [loading,setLoading] = useState(false)
    const onFinish = (item_id:HotItem['item_id']) => {
        setLoading(true)
        HotQuery.getItemAnalyzeData<typeof data>(item_id).then(result => {
            if (result.Ok) setData(result.AnalyzeData || [])
            setLoading(false)
        })
    }
    return (
        <div className='item-analyze-container'>
            <ItemForm onFinish={onFinish}/>
            <AnalyzeTable dataSource={data} loading={loading}/>
        </div>
    )
}

export default ItemAnalyze;