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
nx dev marketplace
```

Build project

```bash
pnpm --filter marketplace clear && nx build marketplace
```

Run project in prod mode

```bash
nx serve marketplace
```
