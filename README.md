# Meninas 2.0 — E-commerce Platform

A full-featured Next.js 14 e-commerce application with Stripe payments, GraphQL data fetching, and Zustand state management.

[![CI](https://github.com/xabierlameiro/meninas2.0/actions/workflows/ci.yml/badge.svg)](https://github.com/xabierlameiro/meninas2.0/actions/workflows/ci.yml)

## Features

- 🛒 Product catalog with categories and filters
- 💳 Stripe payment integration
- 🗂️ Shopping cart with Zustand
- 🔍 GraphQL data layer
- 🔒 Authentication flow

## Stack

| Layer           | Choice                  |
| --------------- | ----------------------- |
| Framework       | Next.js 14 (App Router) |
| Language        | TypeScript              |
| Payments        | Stripe                  |
| Data            | GraphQL                 |
| State           | Zustand                 |
| Package manager | npm                     |

## Getting started

```bash
git clone https://github.com/xabierlameiro/meninas2.0.git
cd meninas2.0
npm install
```

Copy `.env.example` to `.env.local` and fill in your Stripe API keys and GraphQL endpoint:

```bash
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run lint`  | ESLint                   |

## License

[MIT](./LICENSE) — © 2026 Xabier Lameiro
