/**
 * @description 路由界面配置
 */
import Console from "@pages/Console/index.jsx";
import AllGoods from "@pages/Goods/all.tsx";
import AllItems from "@pages/SingeItems/all.tsx";
import SelectGoods from "@pages/Goods/select.tsx";
import AllShops from "@pages/Shops/all.jsx";
import AllHots from "@pages/Hots/all.jsx";
import ShopInfo from "@pages/Shops/ShopInfo.tsx";
import FormUpload from "@pages/Form/FormUpload";
import FormEdit from "@pages/Form/FormEdit";

const routes = [
    {
      path: '*',
      element: <Console/>
    },
    {
        path:'/',
        element: <Console/>
    },
    {
        path:'/console',
        element: <Console/>
    },
    {
        path: '/good/all',
        element: <AllGoods/>,
    },
    {
        path: '/good/select',
        element: <SelectGoods/>
    },
    {
        path: '/item/all',
        element: <AllItems/>
    },
    {
        path: '/shop/all',
        element: <AllShops/>,
        exact:true
    },
    {
        path: '/shop/:shopid',
        element: <ShopInfo/>
    },
    {
        path: '/hot/all',
        element: <AllHots/>
    },
    {
        path: '/form/add',
        element: <FormUpload/>
    },
    {
        path: '/form/edit',
        element: <FormEdit/>
    }
]
export default routes