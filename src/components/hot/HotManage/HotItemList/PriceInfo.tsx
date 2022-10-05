import React, { Fragment } from 'react';
type Props = {
    dataSource:DataItem[]
    // onFinish:(callback:(setData:(value:DataItem[]) => void,setModified:(modified:boolean) => void) => void) => void
}
/**
 * @description 价格分析
 * @constructor
 */
function PriceInfo({dataSource}:Props) {
    const columns = dataSource[0].data.shipping.map(({from,to,transfer}) => ({from,to,transfer}))
    return (
        <tbody>
            <tr>
                <th colSpan={dataSource.length + 1}>价格分析</th>
            </tr>
            { columns.map(({from,to,transfer},index) => {
                    return <Fragment key={transfer}>
                        <tr key={transfer}>
                            <td className='column-title-cell'>
                                <span>{`${from}->${to}`}</span>
                            </td>
                            {dataSource.map(({item_id,data:{shipping}}) => {
                                const {cost = 0}  = shipping[index] || {}
                                return <td key={item_id} className='column-data-cell'>
                                    价格:{cost}
                                </td>

                            })}
                        </tr>
                        <tr>
                            <td className='column-title-cell'>
                                物流渠道
                            </td>
                            {dataSource.map(({item_id,data:{shipping}}) => {
                                const {transfer = '无'} = shipping[index] || {}
                                return <td key={item_id} className='column-data-cell'>
                                    {transfer}
                                </td>
                            })}
                        </tr>
                    </Fragment>
                }) }
        </tbody>
    )
}

export default PriceInfo;