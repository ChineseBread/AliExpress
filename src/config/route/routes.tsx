/**
 * @description 路由界面配置
 */
import React from "react";
import Console from "@pages/Console/Console";
import AllGoods from "@pages/Goods/all";
import SelectGoods from "@pages/Goods/select";
import AllItems from "@pages/SingeItems/all";
import AllHots from "@pages/Hots/all";
import FormUpload from "@pages/Form/FormUpload";
import FormEdit from "@pages/Form/FormEdit";
import AllShops from "@pages/Shops/all";
import ShopInfo from "@pages/Shops/ShopInfo";
import ShopManage from "@pages/Shops/ShopManage";
import ShopUpload from "@pages/Shops/ShopUpload";
type routeComponets = {
    path:string
    element?:React.ReactNode
    exact?:boolean
    children?:routeComponets[]
}
const routes:routeComponets[] = [
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
        path:'/good',
        children:[
            {
                path: '/good/all',
                element: <AllGoods/>,
            },
            {
                path: '/good/select',
                element: <SelectGoods/>
            },
        ]
    },
    {
        path: '/item/all',
        element: <AllItems/>
    },
    {
        path:'/shop',
        children:[
            {
                path: '/shop/all',
                element: <AllShops/>,
            },
            {
                path: '/shop/goods/:shopid',
                element: <ShopInfo/>
            },
            {
                path:'/shop/manage',
                element: <ShopManage/>,
            },
            {
                path:'/shop/upload',
                element: <ShopUpload/>,
            }
        ]
    },
    {
        path: '/hot/all',
        element: <AllHots/>
    },
    {
      path:'/form',
      children:[
          {
              path: '/form/add',
              element: <FormUpload/>
          },
          {
              path: '/form/edit',
              element: <FormEdit/>
          }
      ]
    },

]
export default routes