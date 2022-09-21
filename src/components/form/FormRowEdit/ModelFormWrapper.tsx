import React, {useMemo} from 'react';
import ModelChange from "@components/form/FormRowEdit/ModelChange/ModelChange";
import TitleChange from "@components/form/FormRowEdit/TitleChange/TitleChange";
import TemplateChange from "@components/form/FormRowEdit/TemplateChange/TemplateChange";
import ProfitRate from "@components/form/FormRowEdit/ProfitRate";
import Discount from "@components/form/FormRowEdit/Discount";
import ExchangeRate from "@components/form/FormRowEdit/ExchangeRate";
const forms:any = {
    'model': <ModelChange/>,
    'title': <TitleChange/>,
    'template': <TemplateChange/>,
    'profit_rate': <ProfitRate/>,
    'sales_count': <Discount/>,
    'exchange_rate': <ExchangeRate/>
}
type props = {
    onFinish:(value:PrevTableColumn[]) => void,
    tableData:{
        data:PrevTableColumn[],
        rowKey:string,
        index?:number
    }
}
const ModalContext = React.createContext<props>({tableData:{data:[],rowKey:''},onFinish:(value) => {}})
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
