class PrevTableFormDataStorage{
    //默认时常1小时
    static saveData(data){
        localStorage.setItem('data',JSON.stringify({prevTableData:data,time:Date.now()}))
    }
    static getData(){
        let data = JSON.parse(localStorage.getItem('data'))
        //超过1小时
        if (!data || Date.now() - data.time >= 3600000) {
            localStorage.removeItem('data')
            return null
        };
        return {prevTableData:data.prevTableData}
    }
    static removeData(){
        localStorage.removeItem('data')
    }
}
export default PrevTableFormDataStorage