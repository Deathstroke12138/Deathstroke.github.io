import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   name: 'main',
    //   component: () => import('@/views/Main.vue'),//懒加载
    //   children: [
    //     {
    //       path: '/',
    //       name: 'home',
    //       component: () => import('@/views/Home/Home.vue')
    //     },
    //     {
    //       path: '/user',
    //       name: 'user',
    //       component: () => import('@/views/UserManage/UserManage.vue')
    //     },
    //     {
    //       path: '/video',
    //       name: 'video',
    //       component: () => import('@/views/VideoManage/VideoManage.vue')
    //     },
    //     {
    //       path: '/setting1',
    //       name: 'setting1',
    //       component: () => import('@/views/Setting/Setting1.vue')
    //     },
    //     {
    //       path: '/setting2',
    //       name: 'setting2',
    //       component: () => import('@/views/Setting/Setting2.vue')
    //     },
    //     {
    //       path: '/setting3',
    //       name: 'setting3',
    //       component: () => import('@/views/Setting/Setting3.vue')
    //     },
    //   ]
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/Login')
    }
  ]
})


