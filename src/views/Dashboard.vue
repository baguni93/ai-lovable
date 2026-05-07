<script setup>
import { onMounted, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import { GChart } from 'vue-google-charts'
import StatCard from '../components/StatCard.vue'

const store = useTransactionStore()

onMounted(async () => {
  await store.fetchTransactions()
  await store.fetchCategories()
})

// Google Chart 데이터
const pieData = computed(() => {
  const rows = store.expenseByCategory.map(([cat, amt]) => [cat, amt])
  return [['카테고리', '금액'], ...rows]
})

const pieOptions = {
  pieHole: 0.45,
  legend: { position: 'right', textStyle: { fontSize: 13 } },
  chartArea: { width: '95%', height: '85%' },
  colors: ['#6366f1', '#ef4444', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316', '#64748b'],
  pieSliceTextStyle: { color: '#fff', fontSize: 11 }
}

const barData = computed(() => {
  const rows = store.monthlyStats.map(([m, v]) => [m, v.income, v.expense])
  return [['월', '수입', '지출'], ...rows]
})
const barOptions = {
  legend: { position: 'top' },
  colors: ['#10b981', '#ef4444'],
  chartArea: { width: '85%', height: '70%' },
  hAxis: { textStyle: { fontSize: 12 } },
  vAxis: { format: 'short' },
  bar: { groupWidth: '60%' }
}

const lineData = computed(() => {
  let bal = 0
  const rows = store.monthlyStats.map(([m, v]) => {
    bal += v.income - v.expense
    return [m, bal]
  })
  return [['월', '누적 잔액'], ...rows]
})
const lineOptions = {
  legend: { position: 'none' },
  colors: ['#6366f1'],
  chartArea: { width: '85%', height: '70%' },
  curveType: 'function',
  pointSize: 6
}

const fmt = (n) => Number(n).toLocaleString('ko-KR')
</script>

<template>
  <h2 class="page-title"><i class="fa-solid fa-gauge-high text-primary me-2"></i>대시보드</h2>

  <div class="row g-3 mb-4">
    <div class="col-md-3"><StatCard label="총 수입" :value="store.totalIncome" icon="fa-solid fa-arrow-trend-up" variant="bg-income" /></div>
    <div class="col-md-3"><StatCard label="총 지출" :value="store.totalExpense" icon="fa-solid fa-arrow-trend-down" variant="bg-expense" /></div>
    <div class="col-md-3"><StatCard label="잔액" :value="store.balance" icon="fa-solid fa-sack-dollar" variant="bg-balance" /></div>
    <div class="col-md-3"><StatCard label="거래 건수" :value="store.txCount + '건'" icon="fa-solid fa-receipt" variant="bg-count" /></div>
  </div>

  <div class="row g-3">
    <div class="col-lg-7">
      <div class="chart-card">
        <h5><i class="fa-solid fa-chart-column me-2 text-primary"></i>월별 수입/지출</h5>
        <GChart v-if="barData.length>1" type="ColumnChart" :data="barData" :options="barOptions" :resizeDebounce="200" style="height:320px" />
      </div>
      <div class="chart-card">
        <h5><i class="fa-solid fa-chart-line me-2 text-primary"></i>누적 잔액 추이</h5>
        <GChart v-if="lineData.length>1" type="LineChart" :data="lineData" :options="lineOptions" :resizeDebounce="200" style="height:280px" />
      </div>
    </div>
    <div class="col-lg-5">
      <div class="chart-card">
        <h5><i class="fa-solid fa-chart-pie me-2 text-primary"></i>카테고리별 지출</h5>
        <GChart v-if="pieData.length>1" type="PieChart" :data="pieData" :options="pieOptions" :resizeDebounce="200" style="height:340px" />
      </div>
      <div class="chart-card">
        <h5><i class="fa-solid fa-clock-rotate-left me-2 text-primary"></i>최근 거래</h5>
        <ul class="list-group list-group-flush">
          <li v-for="t in store.recentTransactions" :key="t.id" class="list-group-item d-flex justify-content-between align-items-center px-0">
            <div>
              <div class="fw-semibold">{{ t.description }}</div>
              <small class="text-muted">{{ t.date }} · {{ t.category }}</small>
            </div>
            <span :class="t.type==='income'?'text-income':'text-expense'" class="fw-bold">
              {{ t.type==='income'?'+':'-' }}{{ fmt(t.amount) }}원
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
