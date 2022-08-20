class PrevTableFormDataStorage{
    //默认时常1小时
    static saveData(data){
        localStorage.setItem('prevTableData',JSON.stringify({prevTableData:data,time:Date.now()}))
    }
    static getData(){
        let data = JSON.parse(localStorage.getItem('prevTableData'))
        //超过1小时
        if (!data || Date.now() - data.time >= 3600000) {
            localStorage.removeItem('prevTableData')
            return null
        };
        return {prevTableData:data.prevTableData}
    }
    static removeData(){
        localStorage.removeItem('prevTableData')
    }
    //前置表格表单数据
    // static savePrevFormData(data){
    //     sessionStorage.setItem('prevFormData',JSON.stringify(data))
    // }
    // static getPrevFormData(){
    //     return JSON.parse(sessionStorage.getItem('prevFormData'))
    // }
}
export default PrevTableFormDataStorage