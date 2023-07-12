import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: './home'
    },
    {
      path: '/home',
      name: '/home',
      component: () => import('@/views/home/Home.vue'),
      children: [
        {
          path: '',
          name: '/create',
          redirect: '/home/create'
        },
        {
          path: 'create',
          name: 'create',
          component: () => import('@/views/home/Create.vue')
        },
        {
          path: 'me',
          name: 'me',
          component: () => import('@/views/home/Me.vue')
        }
    ]
    },
    {
      path: '/create-vote',
      name: 'create-vote',
      component: () => import('@/views/create-vote/CreateVote.vue')
    },
    {
      path: '/login',
      name: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/vote/:id',
      name: 'view-vote',
      component: () => import('@/views/create-vote/View-vote.vue')
    }
  ]
})

export default router
