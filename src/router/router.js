import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../views/登陆注册页面/Login'
import Register from '../views/登陆注册页面/Register'
import Goods from "../views/商品展示页面/Goods"
import PostGood from "../views/商品上传页面/PostGood";
import Head from "../components/Head";
import IdleDetails from "../views/闲置品详情页面/IdleDetails";
import ShoppingCart from "../views/购物车页面/ShoppingCart";
import IssueRecord from "../views/发布记录页面/IssueRecord";
import ModifyIdleInfo from "../views/闲置信息修改页面/ModifyIdleInfo";
import PersonalInfo from "../views/个人资料页面/PersonalInfo";
import OrderConfirm from "../views/订单详情页面/OrderConfirm";
import OrderPay from "../views/订单详情页面/OrderPay";
import OrderCenter from "../views/订单中心页面/OrderCenter"
import ChatRoom from "../views/聊天页面/ChatRoom"

export default new Router({
    routes:[
        {
            path:'/',
            redirect:'/login',
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                keepAlive: false
            }},
        {
            path: '/register',
            component: Register,
            meta: {
                keepAlive: false
            }
        },
        {
            path: '/goods',
            component: Goods,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/postGood',
            component: PostGood,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/idleDetails',
            component: IdleDetails,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/shoppingCart',
            component: ShoppingCart,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/issueRecord',
            component: IssueRecord,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/modifyIdleInfo',
            component: ModifyIdleInfo,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/personalInfo',
            component: PersonalInfo,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/orderConfirm',
            component: OrderConfirm,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/orderPay',
            component: OrderPay,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/orderCenter',
            component: OrderCenter,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/chatRoom',
            component: ChatRoom,
            meta: {
                keepAlive: true
            }
        },
        {
            path: '/head',
            component: Head
        },

    ]
})