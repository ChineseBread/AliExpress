/**
 * @description 路由界面配置
 */
import Console from "@pages/console/Console";
import AllGoods from "@pages/goods/All";
import SelectGoods from "@pages/goods/Select";
import AllItems from "@pages/singeItems/All";
import FormUpload from "@pages/form/FormUpload";
import FormEdit from "@pages/form/FormEdit";
import AllShops from "@pages/shops/All";
import ShopInfo from "@pages/shops/ShopInfo";
import ShopManage from "@pages/shops/ShopManage";
import ShopWatermark from "@pages/shops/ShopWatermark";
import HotManage from "@pages/hots/Manage";
import HotGroups from "@pages/hots/HotGroups";
// import ItemInfo from "@pages/hots/ItemInfo";
type routeComponent = {
    path:string
    element?:JSX.Element
    exact?:boolean
    children?:routeComponent[]
}
const routes:routeComponent[] = [
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
                path:'/shop/watermark',
                element: <ShopWatermark/>,
            }
        ]
    },
    {
      path:'/hot',
      children:[
          {
              path:'/hot/manage',
              element: <HotGroups/>,
          },
          {
              path:'/hot/manage/:hots_id',
              element: <HotManage/>
          },
          // {
          //     path: '/hot/manage/:hots_id/:item_id',
          //     element: <ItemInfo/>
          // }
      ]
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