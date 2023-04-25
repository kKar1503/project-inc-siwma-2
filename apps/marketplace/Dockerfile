FROM node:16.18.1-alpine3.15 as deps
RUN apk add --no-cache rsync && corepack enable

WORKDIR /workspace-install

# Preparing for Installation
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=bind,target=/docker-context \
    rsync -amv --delete \
          --exclude='node_modules' \
          --exclude='*/node_modules' \
          --include='package.json' \
          --include='schema.prisma' \
          --include='.meshrc.yaml' \
          --include='*/' --exclude='*' \
          /docker-context/ /workspace-install/;

ENV PRISMA_CLI_BINARY_TARGETS=linux-musl

# Installing Dependencies
RUN pnpm install --prod --frozen-lockfile

# ===================================================================

FROM node:16.18.1-alpine3.15 as builder

WORKDIR /app
COPY . .
COPY --from=deps /workspace-install ./

RUN npm i -g pnpm

# Build NextJS build
RUN pnpm --filter marketplace build:vercel

# Build Prisma Client
RUN pnpm --filter marketplace prisma:generate

# ===================================================================

FROM node:16.18.1-alpine3.15 as runner

WORKDIR /app
ENV NODE_ENV production

# Adding user & usergroup for NextJS's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copying the standalone files & changing owners
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Changing user to NextJS's user
USER nextjs

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# NextJS server is being run using node server.js
CMD ["node", "server.js"]
