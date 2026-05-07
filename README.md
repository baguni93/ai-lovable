# 📊 가계부 대시보드 (Vue3 + json-server)

Vue3 Composition API + Pinia + Bootstrap5 + Google Charts + Font Awesome + Axios + json-server

## 🚀 실행 방법

```bash
npm install
npm start            # json-server(3001) + vite(5173) 동시 실행 *오류발생 시 환경변수 Path 체크
```

또는 분리 실행:
```bash
npm run server       # json-server, http://localhost:3001
npm run dev          # vite, http://localhost:5173
```

## 📁 구조

```
src/
├── main.js                    # 앱 엔트리 (Pinia, Router, Bootstrap, FontAwesome)
├── App.vue                    # 사이드바 레이아웃
├── router/index.js            # vue-router 설정
├── stores/
│   ├── api.js                 # axios 인스턴스 (json-server 연결)
│   └── transaction.js         # Pinia 스토어 (Composition API)
├── views/
│   ├── Dashboard.vue          # 대시보드 (Google Charts)
│   ├── Transactions.vue       # 거래내역 목록
│   └── AddTransaction.vue     # 거래 추가
└── components/StatCard.vue
db.json                        # 샘플 거래 100건
```

## 🧩 컴포넌트 구성도

```mermaid
flowchart TD
  main_js[src/main.js] --> app_vue[src/App.vue]
  app_vue --> router_view[<RouterView/>]
  router_view --> dash[Dashboard.vue (/) ]
  router_view --> txs[Transactions.vue (/transactions)]
  router_view --> add[AddTransaction.vue (/add)]

  dash --> store[transaction store (src/stores/transaction.js)]
  txs --> store
  add --> store

  dash --> statcard[StatCard.vue (src/components/StatCard.vue)]
  dash --> charts[Google Charts (vue-google-charts: GChart)]

  store --> api[src/stores/api.js (axios)]
  api --> jsonserver[json-server (db.json, http://localhost:3001)]
```

핵심 흐름은 `App.vue`의 라우트에 따라 페이지(`views/*`)가 바뀌고, 각 페이지는 `transaction store`를 통해 `json-server`의 데이터를 가져오거나(조회) 추가/삭제합니다.

## 💡 기능
- 📈 대시보드: 총수입/총지출/잔액/건수 + 월별 막대그래프 + 카테고리 도넛 + 누적잔액 라인
- 📋 거래내역: 검색, 수입/지출 필터, 삭제
- ➕ 거래추가: 카테고리/결제수단/메모 입력
