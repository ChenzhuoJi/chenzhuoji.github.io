---
title: TypeScript 入门笔记
date: 2026-05-10
genre: vibe
column: 重构笔记
tags: [技术, TypeScript]
description: TypeScript 基础类型与常用技巧。
---

## 基础类型

```ts
// 基本类型
const name: string = 'TypeScript'
const year: number = 2026
const isAwesome: boolean = true

// 数组
const items: string[] = ['a', 'b', 'c']
const numbers: Array<number> = [1, 2, 3]

// 元组
const pair: [string, number] = ['age', 25]

// 枚举
enum Direction {
  Up,
  Down,
  Left,
  Right,
}
```

## 接口与类型

```ts
interface User {
  id: string
  name: string
  email: string
  age?: number // 可选
}

type Status = 'active' | 'inactive' | 'banned'

type UserWithStatus = User & { status: Status }
```

## 泛型

```ts
function identity<T>(arg: T): T {
  return arg
}

// 约束泛型
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}
```

TypeScript 的类型系统非常强大，值得深入学习。
