import {Tabs} from "antd";
import NewlyIncreasedGoods from "@components/console/GoodsTab/NewlyIncreasedGoods";
import NewlyIncreasedItems from "@components/console/GoodsTab/NewlyIncreasedItems";
import SuspectedTapinator from "@components/console/GoodsTab/SuspectedTapinator";
const {TabPane} = Tabs
function GoodsTab() {
    return (
       <>
           <Tabs defaultActiveKey="1">
               <TabPane tab="新增商品" key="1">
                   <NewlyIncreasedGoods/>
               </TabPane>
               <TabPane tab="新增单件" key="2">
                   <NewlyIncreasedItems/>
               </TabPane>
               <TabPane tab="疑似断更" key="3">
                   <SuspectedTapinator/>
               </TabPane>
           </Tabs>

       </>
    )
}

export default GoodsTab;