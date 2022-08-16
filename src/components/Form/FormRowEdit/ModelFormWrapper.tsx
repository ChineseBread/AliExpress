import React, {useMemo} from 'react';
import ModelChange from "@components/Form/FormRowEdit/ModelChange/ModelChange";
import TitleChange from "@components/Form/FormRowEdit/TitleChange";
import TemplateChange from "@components/Form/FormRowEdit/TemplateChange";
import {PrevTableColumn} from "@type/PrevTable";
import ProfitRate from "@components/Form/FormRowEdit/ProfitRate";
import Discount from "@components/Form/FormRowEdit/Discount";
import ExchangeRate from "@components/Form/FormRowEdit/ExchangeRate";
const forms:any = {
    'model': <ModelChange/>,
    'title': <TitleChange/>,
    'template': <TemplateChange/>,
    'profit_rate': <ProfitRate/>,
    'sales_count': <Discount/>,
    'exchange_rate': <ExchangeRate/>
}
type props = {
    onFinish:(data:PrevTableColumn[]) => void,
    tableData:{
        data:PrevTableColumn[],
        rowKey:string,
        index?:number
    }
}
const ModalContext = React.createContext<props>({tableData:{data:[],rowKey:''},onFinish:(data) => {}})
function ModelFormWrapper({onFinish,tableData,editType}:props & {editType:string}) {
    return (
        <ModalContext.Provider value={{tableData,onFinish}}>
            {useMemo(() => {
              return forms[editType]
            },[editType])}
        </ModalContext.Provider>
    )
}
export {ModalContext};
export default ModelFormWrapper;
