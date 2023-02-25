::과제

## 실행 방법

```bash
> yarn
> yarn start # http://localhost:3000
```


## 🚨 Error 발견

- input의 onChange props에 전달된 함수의 매개변수가 이전값을 참조해서 계속 반영되지 않는 문제를 발견했습니다...😭


## 구조

```
uniswap
└─ src
   ├─ App.tsx
   ├─ routes.tsx
   ├─ assets
   │  └─ main.css
   ├─ component
   │  ├─ common
   │  │  └─ Layout
   │  ├─ swap
   │  │  └─ SwapTokenView
   │  │  └─ SelectTokenView
   │  │  └─ context.tsx
   │  └─ ui
   │     └─ Button
   │     └─ Input
   │     └─ Modal
   │     └─ context.tsx
   ├─ lib
   │  ├─ utils.ts
   │  └─ validation.ts
   ├─ router
   │  └─ router.tsx
   ├─ pages
   │  └─ _layout.tsx
   │  └─ swap.tsx
   ├─ lib
   │  └─ hooks
   │    └─ useCurrencies.tsx
   │    └─ useGetDetailsOfTokensByIds
   │  └─ typings.ts
   │  └─ updateHistory.ts
   └─ config
      └─ token-list.ts
```

## 2. bundler

- `webpack`

## 3. api query

- `react-query`
