/**
 * @description 控制台
 */
import GoodsStage from "@components/console/Stage/GoodsStage.tsx";
import ItemsStage from "@components/console/Stage/ItemsStage.tsx";
import ShopsStage from "@components/console/Stage/ShopsStage.tsx";
import Tapinator from "@components/console/Stage/Tapinator.tsx";
import GoodsTab from "@components/console/GoodsTab/GoodsTab.tsx";
function Console(props) {
    return (
        <>
            <div className='console-stage-container'>
                <GoodsStage/>
                <ItemsStage/>
                <ShopsStage/>
                <Tapinator/>
            </div>
            <div className='console-table-container box-shadow'>
                <GoodsTab/>
            </div>
        </>

    )
}

export default Console;