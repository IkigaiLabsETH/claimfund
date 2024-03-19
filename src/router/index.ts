import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Public from '@/views/Public.vue'
import Create from '@/views/Create.vue'
import Private from '@/views/Private.vue'

const router = createRouter({
  // @ts-ignore compilerOptions/module is 'NodeNext' but still it does not recognize it (though no errors in running)
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'index',
      component: Index
    },
    {
      path: '/box/:public_key',
      name: 'public',
      component: Public
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/manage/:private_key',
      name: 'private',
      component: Private
    }
  ]
})

export default router
