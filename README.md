::과제

## 실행 방법

```bash
> yarn
> yarn start  #http://localhost:3000
```

## 구조

```
uniswap
├─ index.html
├─ app.tsx
└─ src
   ├─ App.tsx
   ├─ routes.tsx
   ├─ assets
   │  └─ main.css
   ├─ components
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
   ├─ pages
   │  └─ _layout.tsx
   │  └─ swap.tsx
   ├─ lib
   │  ├─ hooks
   │  │  └─ useCurrencies.tsx
   │  │  └─ useGetDetailsOfTokensByIds.tsx
   │  ├─ types.ts
   │  ├─ updateHistory.ts
   │  └─ queryClient.ts
   └─ config
      └─ token-list.ts
```

## 2. bundler

- `webpack`: 직접 셋팅하기 (`webpack.config.ts`)

## 3. 상태 관리

- api: `react-query`
- client: `context`
