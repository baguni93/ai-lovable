<script setup>
defineProps({
  label: String, value: [String, Number], icon: String, variant: String
})
const fmt = (v) => typeof v === 'number' ? v.toLocaleString('ko-KR') + '원' : v
</script>
<template>
  <div class="stat-card d-flex justify-content-between align-items-center">
    <div>
      <div class="label">{{ label }}</div>
      <div class="value">{{ typeof value==='number' ? fmt(value) : value }}</div>
    </div>
    <div :class="['icon', variant]"><i :class="icon"></i></div>
  </div>
</template>
