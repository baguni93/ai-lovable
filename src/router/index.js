import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import AddTransaction from '../views/AddTransaction.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/transactions', name: 'transactions', component: Transactions },
    { path: '/add', name: 'add', component: AddTransaction }
  ]
})
export default router
