import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import path from 'path'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component:() => import('../views/layout/layout.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component:() => import('../views/login/login.vue'),
    },
      {    
        path:'/RoomDesc',
        name:'RoomDesc',
        component:() => import('../views/page/RoomDesc.vue')
      },
      {
        path:'/Pricedesc',
        name:'Pricedesc',
        component:() => import('../views/page/Pricedesc.vue')
      },
      {
        path:'/evaluate',
        name:'evaluate',
        component:() => import('../views/page/evaluate.vue')
      },
      
      

  ]
})

export default router
