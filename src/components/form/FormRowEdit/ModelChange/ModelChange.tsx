import React, {useState} from 'react';
import ModelForm from "@components/form/FormRowEdit/ModelChange/ModelForm";
import ModalSearch from "@components/form/FormRowEdit/ModelChange/ModelSearch";

//型号与套图
function ModelChange() {

    const [value,setValue] = useState<SearchData | undefined>()
    const onSearch = (value: SearchData) => {
        setValue(value)
    }
    return (
        <div className='type-form-container'>
            <ModalSearch onSearch={onSearch}/>
            <ModelForm SearchData={value}/>
        </div>
    )
}

export default ModelChange;