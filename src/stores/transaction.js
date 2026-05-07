import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './api'

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([])
  const categories = ref({ income: [], expense: [] })
  const loading = ref(false)
  const error = ref(null)

  // ===== Fetch =====
  const fetchTransactions = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await api.get('/transactions?_sort=date&_order=desc')
      transactions.value = res.data
    } catch (e) {
      error.value = e.message
      console.error('fetchTransactions error', e)
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories')
      categories.value = res.data
    } catch (e) {
      console.error('fetchCategories error', e)
    }
  }

  // ===== Add / Delete =====
  const addTransaction = async (tx) => {
    const res = await api.post('/transactions', tx)
    transactions.value.unshift(res.data)
    return res.data
  }

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`)
    transactions.value = transactions.value.filter(t => t.id !== id)
  }

  // ===== Computed Stats =====
  const totalIncome = computed(() =>
    transactions.value.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  )
  const totalExpense = computed(() =>
    transactions.value.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  )
  const balance = computed(() => totalIncome.value - totalExpense.value)
  const txCount = computed(() => transactions.value.length)

  // 카테고리별 지출
  const expenseByCategory = computed(() => {
    const map = {}
    transactions.value.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + Number(t.amount)
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  })

  // 월별 수입/지출
  const monthlyStats = computed(() => {
    const map = {}
    transactions.value.forEach(t => {
      const m = t.date.slice(0, 7)
      if (!map[m]) map[m] = { income: 0, expense: 0 }
      map[m][t.type] += Number(t.amount)
    })
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]))
  })

  // 최근 거래
  const recentTransactions = computed(() => transactions.value.slice(0, 8))

  return {
    transactions, categories, loading, error,
    fetchTransactions, fetchCategories, addTransaction, deleteTransaction,
    totalIncome, totalExpense, balance, txCount,
    expenseByCategory, monthlyStats, recentTransactions
  }
})
