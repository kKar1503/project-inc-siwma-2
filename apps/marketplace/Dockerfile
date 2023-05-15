FROM node:18.15.0-alpine3.17 as depsbuilder

WORKDIR /app

COPY . .

# Installing Dependencies
RUN npm install -g pnpm && pnpm run ci

# DATABASE_URL for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# NextAuth URL and Secret
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Build Options
ARG NEXT_BUILD_OPTION
ARG NEXT_ESLINT_OPTION
ENV NEXT_BUILD_OPTION=$NEXT_BUILD_OPTION
ENV NEXT_ESLINT_OPTION=$NEXT_ESLINT_OPTION

# Building NextJS
RUN npx nx run @inc/marketplace:build:prod

# ===================================================================

FROM node:18.15.0-alpine3.17 as runner

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
COPY --from=depsbuilder /app/apps/marketplace/public ./public
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/marketplace/.next/standalone ./
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/marketplace/.next/static ./apps/marketplace/.next/static

# Changing user to NextJS's user
USER nextjs

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# NextJS server is being run using node server.js
CMD ["node", "apps/marketplace/server.js"]
