<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const router = useRouter()

const form = ref({
  date: new Date().toISOString().slice(0, 10),
  type: 'expense',
  category: '',
  amount: '',
  method: '신용카드',
  description: '',
  memo: ''
})

onMounted(() => store.fetchCategories())

const availableCategories = computed(() => store.categories[form.value.type] || [])

const submit = async () => {
  if (!form.value.category || !form.value.amount || !form.value.description) {
    alert('필수 항목을 입력해주세요.')
    return
  }
  await store.addTransaction({
    ...form.value,
    amount: Number(form.value.amount)
  })
  alert('등록되었습니다!')
  router.push('/transactions')
}
</script>

<template>
  <h2 class="page-title"><i class="fa-solid fa-plus-circle text-primary me-2"></i>거래 추가</h2>
  <div class="chart-card" style="max-width:640px">
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label class="form-label">구분</label>
        <div class="btn-group w-100">
          <input type="radio" class="btn-check" id="t-income" value="income" v-model="form.type" />
          <label class="btn btn-outline-success" for="t-income"><i class="fa-solid fa-arrow-up me-1"></i>수입</label>
          <input type="radio" class="btn-check" id="t-expense" value="expense" v-model="form.type" />
          <label class="btn btn-outline-danger" for="t-expense"><i class="fa-solid fa-arrow-down me-1"></i>지출</label>
        </div>
      </div>

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">날짜</label>
          <input type="date" v-model="form.date" class="form-control" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">금액</label>
          <input type="number" v-model="form.amount" class="form-control" placeholder="0" required />
        </div>
        <div class="col-md-6">
          <label class="form-label">카테고리</label>
          <select v-model="form.category" class="form-select" required>
            <option value="">선택하세요</option>
            <option v-for="c in availableCategories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">결제수단</label>
          <select v-model="form.method" class="form-select">
            <option>현금</option><option>체크카드</option><option>신용카드</option><option>계좌이체</option>
          </select>
        </div>
        <div class="col-12">
          <label class="form-label">설명</label>
          <input type="text" v-model="form.description" class="form-control" placeholder="예: 스타벅스 아메리카노" required />
        </div>
        <div class="col-12">
          <label class="form-label">메모</label>
          <textarea v-model="form.memo" class="form-control" rows="2"></textarea>
        </div>
      </div>

      <button type="submit" class="btn btn-primary mt-4 px-4">
        <i class="fa-solid fa-floppy-disk me-2"></i>저장
      </button>
    </form>
  </div>
</template>
