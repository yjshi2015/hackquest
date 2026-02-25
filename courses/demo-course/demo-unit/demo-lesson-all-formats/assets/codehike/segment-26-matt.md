## !!steps Query

!duration 160

```ts !! query
const user = {
  name: "Ada",
  age: 26,
}

console.log(user.name)
//           ^?
```

## !!steps Error

!duration 180

```ts !! error
const user = {
  name: "Ada",
  age: 26,
}

// @errors: 2339
console.log(user.location)
```

## !!steps Fix

!duration 220

```ts !! fix
const user = {
  name: "Ada",
  age: 26,
  location: "Shanghai",
}

// !mark 55 25
console.log(user.location)
//           ^?
```
