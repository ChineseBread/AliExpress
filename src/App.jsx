import {useRoutes,useNavigate} from 'react-router-dom'
import {
    ControlOutlined,
    PayCircleOutlined,
    ShopOutlined,
    ShoppingOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import routes from "@config/route/routes.jsx";
import '@styles/index.less'
import './App.less'
import {useState} from "react";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('控制台', 'console', <ControlOutlined />),
    getItem('商品', 'good', <ShopOutlined />,[
        getItem('全部商品','good/all'),
        getItem('筛选商品','good/select')
    ]),
    getItem('单件', 'item', <ShoppingOutlined />, [
        getItem('全部单件','item/all'),
    ]),
    getItem('店铺', 'shop', <ShopOutlined />, [
        getItem('全部店铺','shop/all'),
    ]),
    getItem('爆品', 'hot', <PayCircleOutlined />, [
        getItem('全部爆品','hot/all'),
    ]),
    getItem('表单页', 'form', <ShopOutlined />,[
        getItem('上传','form/add'),
        getItem('编辑','form/edit')
    ]),
];
// 布局界面 监管路由
function App() {
    const Outlet = useRoutes(routes)
    const navigator = useNavigate()
    const onMenuItemChange = ({key}) => {
        navigator(key)
    }
    return (
        <Layout>
            <Sider>
                <div className="logo" >AliExpress</div>
                <Menu mode='inline' onClick={onMenuItemChange} theme="dark" items={items} />
            </Sider>

            <Layout className="site-layout">
                <Content>
                    {Outlet}
                </Content>
            </Layout>
        </Layout>
    );
}

export default App
