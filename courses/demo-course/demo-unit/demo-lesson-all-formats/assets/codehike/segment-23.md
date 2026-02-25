## !!steps v1

!duration 120

```ts ! quote.ts
function quoteOut(amountIn: number, price: number) {
  return amountIn * price
}
```

## !!steps Add fee

!duration 180

```ts ! quote.ts
function quoteOut(amountIn: number, price: number, feeBps = 30) {
  const gross = amountIn * price
  // !mark 45 28
  return (gross * (10_000 - feeBps)) / 10_000
}
```

## !!steps Guard rails

!duration 220

```ts ! quote.ts
function quoteOut(amountIn: number, price: number, feeBps = 30) {
  // !mark 30 28
  if (feeBps < 0 || feeBps > 1_000) throw new Error("invalid fee")
  const gross = amountIn * price
  // !mark 70 28
  return (gross * (10_000 - feeBps)) / 10_000
}
```
