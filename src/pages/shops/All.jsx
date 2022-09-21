import React from 'react';
import ShopLists from "@components/shops/ShopLists.tsx";
//全部店铺
function AllShops() {
    return (
        <div className='shops-list-container box-shadow'>
            <ShopLists/>
        </div>
    )
}

export default AllShops;