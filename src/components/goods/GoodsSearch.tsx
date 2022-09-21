import {Input} from "antd";
import {useNavigate} from "react-router-dom";
const {Search} = Input
//单件查询
function GoodsSearch() {
    const navigator = useNavigate()
    const onSearch = (value:string) => {
        navigator(`/good/all${value && `?query=${value}`}`)
    }
    return (
        <div style={{float:'right',width:300,marginBottom:15}}>
            <Search onSearch={onSearch} placeholder='输入商品关键词'/>
        </div>
    )
}

export default GoodsSearch;