/**
 * @description 控制台
 */
import GoodsStage from "@components/Console/Stage/GoodsStage.tsx";
import ItemsStage from "@components/Console/Stage/ItemsStage.tsx";
import ShopsStage from "@components/Console/Stage/ShopsStage.tsx";
import Tapinator from "@components/Console/Stage/Tapinator.tsx";
import GoodsTab from "@components/Console/GoodsTab/GoodsTab.tsx";
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