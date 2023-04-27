# project-inc-siwma-2

The second revision of SIWMA Marketplace.

## Pre-requisites

- NodeJS v16.20.0 and above
- Visual Studio Code OR WebStorm
- Docker
- `pnpm` globally installed
- `nx` globally installed (Optional)

To install `pnpm` globally:

```bash
npm install -g pnpm
```

To install `nx` globally:

```bash
npm install -g nx
```

## Installation

**If `nx` is not installed globally, please prefix all `nx` commands with `npx`**

Clone the repository

```bash
git clone https://github.com/kKar1503/project-inc-siwma-2.git
```

Install dependencies

```bash
pnpm clean-i
```

Generate PrismaClient

```bash
nx run @inc/db:prisma:generate
```

Run project in dev mode

```bash
nx dev @inc/marketplace
```

Build project

**IMPORTANT** Build project using an admin terminal

```bash
nx build @inc/marketplace
```

Run project in prod mode

```bash
nx serve @inc/marketplace
```

Seed database

```bash
pnpm --filter @inc/db prisma:seed
```

## Troubleshooting

If there are issues, try to run commands in an Administrator Terminal

### Windows EPERM ScanDir Error

```cmd
[Error: EPERM: operation not permitted, scandir 'path'] {
  errno: -4048,
  code: 'EPERM',
  syscall: 'scandir',
  path: 'path'
}
```

Please run this command:

```bash
pnpm --filter @inc/marketplace clean
```
