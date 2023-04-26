# project-inc-siwma-2

The second revision of SIWMA Marketplace.

## Pre-requisites

- NodeJS v16.20.0 and above
- Visual Studio Code OR WebStorm
- Docker
- `pnpm` globally installed
- `nx` globally installed

To install `pnpm` globally:

```bash
npm install -g pnpm
```

To install `nx` globally:

```bash
npm install -g nx
```

## Installation

Clone the repository

```bash
git clone https://github.com/kKar1503/project-inc-siwma-2.git
```

Install dependencies

```bash
pnpm install --frozen-lockfile
```

Run project in dev mode

```bash
nx dev @inc/marketplace
```

Build project

**IMPORTANT** Build project using an admin terminal

```bash
pnpm --filter marketplace clear && nx build @inc/marketplace
```

Run project in prod mode

```bash
nx serve @inc/marketplace
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
pnpm --filter marketplace clear
```
