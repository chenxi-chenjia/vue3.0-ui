import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import MainLayout from '@/layout/components/AppMain/main.vue'
import PageLayout from '@/layout/components/AppMain/page.vue'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        hidden: true,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: MainLayout,
                redirect: '/dashboard/index',
                meta: {
                    title: '首页'
                },
                children: [
                    {
                        path: 'index',
                        component: () => import('@/views/dashboard/index'),
                        meta: {
                            title: '首页'
                        },
                    }
                ]
            },
        ]
    },
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})


export const asyncRouterMap = [
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

