import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Card, message} from "antd";
import HotItemList from '@components/hot/HotManage/HotItemList/HotItemList';
import SalesIncrement from "@components/hot/HotManage/SalesIncrement/SalesIncrement";
import ItemAnalyze from "@components/hot/HotManage/ItemAnalyze/ItemAnalyze";
import PriceChange from '@components/hot/HotManage/PriceChange/PriceChange';


/**
 * @description 爆品管理
 * @constructor
 */

const HotContext = React.createContext<{hots_id:HotGroup['hots_id']}>({hots_id:0})
function HotManage() {
    const navigator = useNavigate()
    const {hots_id}:any = useParams()
    useEffect(() => {
        if (!hots_id) {
            message.warn('未找到爆品组id')
            navigator('/hot/manage')
        }
    },[])
    return (
        <HotContext.Provider value={{hots_id}}>
           <div className='hot-items-manage-container'>
               <table id='hot-item-table'>
                   <HotItemList/>
                   <PriceChange/>
                   <SalesIncrement/>
               </table>
               <ItemAnalyze/>
           </div>
        </HotContext.Provider>
    )
}
export {HotContext}
export default HotManage;