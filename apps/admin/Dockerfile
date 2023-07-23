FROM node:18.16.0-alpine3.18 as depsbuilder

WORKDIR /app

COPY apps/admin ./apps/admin
COPY packages ./packages
COPY static ./static
COPY .npmrc nx.json package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# do some eslint magic
RUN rm -f apps/marketplace/.eslintrc.json && mv apps/marketplace/.eslintrc.cli.json apps/marketplace/.eslintrc.json

# DATABASE_URL for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# NextAuth URL and Secret
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Chat Server URL
ARG CHAT_SERVER_URL
ENV NEXT_PUBLIC_CHAT_SERVER_URL=$CHAT_SERVER_URL

# Build Options
ARG NEXT_BUILD_OPTION
ARG NEXT_ESLINT_OPTION
ENV NEXT_BUILD_OPTION=$NEXT_BUILD_OPTION
ENV NEXT_ESLINT_OPTION=$NEXT_ESLINT_OPTION

# Installing Dependencies
RUN npm install -g pnpm
RUN npm pkg set scripts.postinstall="echo 'Postinstall script is disabled'"
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN pnpm --filter db prisma:generate

# Building NextJS
RUN pnpx nx run @inc/admin:build:prod

# ===================================================================

FROM node:18.16.0-alpine3.18 as runner

WORKDIR /app
ENV NODE_ENV production

# DATABASE_URL for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# NextAuth URL and Secret
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Adding user & usergroup for NextJS's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copying the standalone files & changing owners
COPY --from=depsbuilder /app/apps/admin/public ./public
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/admin/.next/standalone ./
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/admin/.next/static ./apps/admin/.next/static

# Changing user to NextJS's user
USER nextjs

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# NextJS server is being run using node server.js
CMD ["node", "apps/admin/server.js"]
