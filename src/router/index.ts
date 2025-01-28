import { createRouter, createWebHistory } from 'vue-router'
import RuleList from '../views/RuleList.vue'
import RuleEditor from '../views/RuleEditor.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: RuleList
    },
    {
      path: '/editor/:id',
      component: RuleEditor
    }
  ]
}) 