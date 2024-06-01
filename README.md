# Inventory Management

To run project locally

```
pnpm install
pnpm dev
```

# Overview

- `component/ui` - primitive compoenents like `input`, `button` and `select`
- `api` - api methods for **inventory** and **products**
- `pages` - main pages, related components and styles
- `shared` - type declarations

I've decided to go as vanilla as possible, not using any third-party libraries, as I thinkn it might be better for a test assignment.

In case of a real world scenario I would:

- use `react-query` for api calls and mutations
- `react-hook-form` for handling forms
- `shadcn-ui` for primitive components
- `tailwindcss` for styling

## Pages

- `/create`

A page to create new products and view newly created products that you can later use to populate your inventory

- `/inventory`

A page where you can populate and view your inventory
