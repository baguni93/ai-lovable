<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const filterType = ref('all')
const search = ref('')

onMounted(() => store.fetchTransactions())

const filtered = computed(() => {
  return store.transactions.filter(t => {
    const okType = filterType.value === 'all' || t.type === filterType.value
    const okSearch = !search.value ||
      t.description.toLowerCase().includes(search.value.toLowerCase()) ||
      t.category.includes(search.value)
    return okType && okSearch
  })
})

const fmt = (n) => Number(n).toLocaleString('ko-KR')

const handleDelete = async (id) => {
  if (confirm('이 거래를 삭제할까요?')) await store.deleteTransaction(id)
}
</script>

<template>
  <h2 class="page-title"><i class="fa-solid fa-list-ul text-primary me-2"></i>거래내역</h2>

  <div class="d-flex gap-2 mb-3 flex-wrap">
    <div class="btn-group">
      <button :class="['btn', filterType==='all'?'btn-primary':'btn-outline-primary']" @click="filterType='all'">전체</button>
      <button :class="['btn', filterType==='income'?'btn-success':'btn-outline-success']" @click="filterType='income'">수입</button>
      <button :class="['btn', filterType==='expense'?'btn-danger':'btn-outline-danger']" @click="filterType='expense'">지출</button>
    </div>
    <input v-model="search" type="text" class="form-control" style="max-width:280px" placeholder="🔍 설명/카테고리 검색" />
  </div>

  <div class="tx-table">
    <table class="table mb-0">
      <thead>
        <tr>
          <th>날짜</th><th>구분</th><th>카테고리</th><th>설명</th><th>결제수단</th><th class="text-end">금액</th><th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in filtered" :key="t.id">
          <td>{{ t.date }}</td>
          <td>
            <span :class="t.type==='income'?'badge bg-success':'badge bg-danger'">
              {{ t.type==='income'?'수입':'지출' }}
            </span>
          </td>
          <td><span class="badge badge-cat">{{ t.category }}</span></td>
          <td>{{ t.description }}</td>
          <td><small class="text-muted">{{ t.method }}</small></td>
          <td :class="['text-end fw-bold', t.type==='income'?'text-income':'text-expense']">
            {{ t.type==='income'?'+':'-' }}{{ fmt(t.amount) }}원
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-danger" @click="handleDelete(t.id)">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="!filtered.length"><td colspan="7" class="text-center text-muted py-4">데이터가 없습니다.</td></tr>
      </tbody>
    </table>
  </div>
</template>
