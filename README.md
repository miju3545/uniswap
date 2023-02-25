::과제

## 실행 방법

```bash
> yarn
> yarn start # http://localhost:3000
```

## 구조

```
mesher-assignment
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
