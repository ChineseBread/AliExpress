import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {message} from "antd";
import SalesIncrement from "@components/hot/HotManage/Increment/SalesIncrement";
import HotForm from '@components/hot/HotManage/HotForm/HotForm';
import HotItemInfo from '@components/hot/HotManage/DashBoard/HotItemInfo';
import ItemList from '@components/hot/HotManage/DashBoard/ItemList';
import SalesList from "@components/hot/HotManage/SalesList/SalesList";
import ShopInfoList from '@components/hot/HotManage/ShopInfoList/ShopInfoList';
import FreightList from '@components/hot/HotManage/FreightList/FreightList';

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
               <HotForm/>
               <HotItemInfo/>
               <ItemList/>
               <SalesIncrement/>
               <SalesList/>
               <ShopInfoList/>
               <FreightList/>
           </div>
        </HotContext.Provider>
    )
}
export {HotContext}
export default HotManage;