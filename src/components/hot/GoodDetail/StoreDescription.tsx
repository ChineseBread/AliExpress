/**
 * @description 商店信息
 * @constructor
 */
import {Descriptions,Typography} from "antd";
const {Link} = Typography
function StoreDescription({openedYear,openTime,storeURL,storeName,positiveNum,positiveRate,storeNum}:HotGroupShopInfo) {
    return (
        <Descriptions bordered>
            <Descriptions.Item label='名称'>
                <Link target='_blank' href={storeURL}>{storeName}</Link>
            </Descriptions.Item>
            <Descriptions.Item label='商店编号'>{storeNum}</Descriptions.Item>
            <Descriptions.Item label='开店时间'>{openTime}</Descriptions.Item>
            <Descriptions.Item label='开店时长'>{`${openedYear}年`}</Descriptions.Item>
            <Descriptions.Item label='好评数'>{positiveNum}</Descriptions.Item>
            <Descriptions.Item label='好评率'>{positiveRate}</Descriptions.Item>
        </Descriptions>
    )
}

export default StoreDescription;