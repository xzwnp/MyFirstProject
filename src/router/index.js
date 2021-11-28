import Vue from 'vue'
//创建整个项目的路由器
import VueRouter from 'vue-router'
//导入被用于路由的组件们
import AdminLogin from "@/views/AdminLogin";
import Home from "@/views/Home";
import NormalLogin from "@/views/NormalLogin";
import Server from "@/views/Server";
import Admin from "@/views/Admin";
//全局注册
Vue.use(VueRouter)
//配置需要用到的路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: NormalLogin,
    },
    {
        path: '/adminLogin',
        name: 'AdminLogin',
        component: AdminLogin,
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import ("@/views/Register")
    },
    {
        path: '/findPassword',
        name: 'FindPassword',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import ("@/views/FindPassword")
    },
    {
        path: '/server',
        name: 'Server',
        component: Server,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },

]
//创建一个路由器
const router = new VueRouter({
    routes
})
//暴露一个路由器
export default router
