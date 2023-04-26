FROM node:18.15.0-alpine3.17 as depsbuilder

WORKDIR /app

COPY . .

# Installing Dependencies
RUN npm install -g pnpm && pnpm clean-i

# Set DATABASE_URL for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Building NextJS
RUN npx nx run @inc/marketplace:build:prod

# ===================================================================

FROM node:18.15.0-alpine3.17 as runner

WORKDIR /app
ENV NODE_ENV production

# Adding user & usergroup for NextJS's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Get NextAuth URL and Secret
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL

# Set NextAuth URL and Secret
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# TODO: remove ignore for tserrors and eslint once all gone
ENV NEXT_BUILD_OPTION="ignoreType"
ENV NEXT_ESLINT_OPTION="ignoreLint"

# Copying the standalone files & changing owners
COPY --from=depsbuilder /app/apps/marketplace/public ./public
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/marketplace/.next/standalone ./
COPY --from=depsbuilder --chown=nextjs:nodejs /app/apps/marketplace/.next/static ./.next/static

# Changing user to NextJS's user
USER nextjs

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# NextJS server is being run using node server.js
CMD ["node", "apps/marketplace/server.js"]
