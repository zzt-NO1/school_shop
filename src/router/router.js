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
export default new Router({
    routes:[
        {
            path:'/',
            redirect:'goods',
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
            path: '/head',
            component: Head
        },

    ]
})