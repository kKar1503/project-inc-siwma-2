FROM node:18.16.0-alpine3.18 as depsbuilder

WORKDIR /app

COPY apps/marketplace ./apps/marketplace
COPY packages ./packages
COPY static ./static
COPY .npmrc nx.json package.json pnpm-lock.yaml pnpm-workspace.yaml ./

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

# Installing Dependencies
RUN npm install -g pnpm
RUN npm pkg set scripts.postinstall="echo 'Postinstall script is disabled'"
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN pnpm --filter db prisma:generate

# Building NextJS
RUN pnpx nx run @inc/marketplace:build:prod

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

# S3
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG AWS_BUCKET
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
ENV AWS_BUCKET=$AWS_BUCKET
ENV NEXT_PUBLIC_AWS_BUCKET=$AWS_BUCKET

# SIB
ARG SIB_API_KEY
ARG SIB_SENDER_EMAIL
ENV SIB_API_KEY=$SIB_API_KEY
ENV SIB_SENDER_EMAIL=$SIB_SENDER_EMAIL

# Frontend URL
ARG FRONTEND_URL
ENV FRONTEND_URL=$FRONTEND_URL
ENV NEXT_PUBLIC_FRONTEND_URL=$FRONTEND_URL

# Challenge for Notifications
ARG CHALLENGE_API_KEY
ENV CHALLENGE_API_KEY=$CHALLENGE_API_KEY

# Adding user & usergroup for NextJS's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copying the standalone files & changing owners
COPY --from=depsbuilder /app/apps/marketplace/public ./apps/marketplace/public
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/marketplace/.next/standalone ./
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/marketplace/.next/static ./apps/marketplace/.next/static

# Changing user to NextJS's user
USER nextjs

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# NextJS server is being run using node server.js
CMD ["node", "apps/marketplace/server.js"]
