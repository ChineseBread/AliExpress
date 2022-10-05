import { Space ,Image} from 'antd';
import React from 'react';
import HeaderForm from './HeaderForm';
type Props = {
    dataSource:DataItem[]
    // onFinish:(callback:(setData:(value:DataItem[]) => void,setModified:(modified:boolean) => void) => void) => void
}

function HeaderInfo({dataSource}:Props) {
    return (
        <tbody id='header-body'>
            <tr>
                <td className='column-title-cell'>
                    <div>爆品数量:</div>
                    <div>竞品数量:</div>
                </td>
                {dataSource.map((item,index) => {
                    return <td className='column-data-cell' key={item.item_id}>
                        {index === 0 ? <span style={{color:'#f5222d'}}>爆品</span> : index === 1 ? <span style={{color:'#1d39c4'}}>主竞品</span> : `次竞品${index}`}
                    </td>
                })}
            </tr>
            <tr>
                <td className='column-title-cell'>
                    <HeaderForm/>
                </td>
                {dataSource.map(({data:{good_images,skus},item_id},index) => {
                    return <td className='column-data-cell' key={item_id}>
                        <Space direction='vertical' align='center'>
                            <div style={{height:150}}>
                                <Image src={good_images[0]} width={150} height={150}/>
                            </div>
                            <div style={{height:50}}>
                                <Space>
                                    {skus.slice(0,5).map(({sku_id,big_image},index) => {
                                        return <Image key={`${sku_id}${index}`} src={big_image} height={50} width={50}/>
                                    })}
                                </Space>
                            </div>
                        </Space>
                    </td>
                })}
            </tr>
            <tr>
                <td className='column-title-cell'>
                    店铺名称/评分
                </td>
                {dataSource.map(({item_id,data:{store:{storeName,positiveRate}}}) => {
                    return <td className='column-data-cell' key={item_id}>
                        <Space>
                            <span>{storeName}</span>
                            <span>{positiveRate}</span>
                        </Space>
                    </td>
                })}
            </tr>
        </tbody>
    )
}

export default HeaderInfo;