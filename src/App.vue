<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <nav class="sidebar">
      <div class="brand">
        <i class="fa-solid fa-wallet"></i>
        <span>MyLedger</span>
      </div>
      <ul class="nav-list">
        <li>
          <RouterLink to="/" class="nav-link-item">
            <i class="fa-solid fa-chart-line"></i> 대시보드
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/transactions" class="nav-link-item">
            <i class="fa-solid fa-list-ul"></i> 거래내역
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/add" class="nav-link-item">
            <i class="fa-solid fa-plus-circle"></i> 거래추가
          </RouterLink>
        </li>
      </ul>
      <div class="sidebar-footer">
        <small><i class="fa-regular fa-circle-user"></i> User</small>
      </div>
    </nav>
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
