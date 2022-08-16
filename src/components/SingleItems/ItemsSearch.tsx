import {Input} from "antd";
import {useNavigate} from "react-router-dom";
const {Search} = Input
//单件查询
function ItemsSearch() {
    const navigator = useNavigate()
    const onSearch = (value:string) => {
      navigator(`/item/all${value && `?query=${value}`}`)
    }
    return (
        <div className='goods-query-container'>
            <Search onSearch={onSearch} placeholder='输入单件关键词'/>
        </div>
    )
}

export default ItemsSearch;