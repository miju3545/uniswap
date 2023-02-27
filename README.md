::과제

## 실행 방법

```bash
> yarn
> yarn start # http://localhost:3000
```

## 🚨 ~~_Error_~~

- ~~_input의 onChange props에 전달된 함수의 매개변수가 이전값을 참조해서 변경(값)을 계속 반영하지 않는 문제가 발견되었음._~~
- (**문제 해결** - event 객체에서 직접 값 추출하는 방식으로 접근.)

## 구조

```
uniswap
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

- `webpack`

## 3. api query

- `react-query`
