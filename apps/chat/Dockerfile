FROM node:18.15.0-alpine3.17 as depsbuilder

WORKDIR /app

COPY apps/chat ./apps/chat
COPY packages/errors ./packages/errors
COPY packages/events ./packages/events
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY static ./static
COPY .npmrc nx.json package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# DATABASE_URL for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Installing Dependencies
RUN npm install -g pnpm
RUN npm pkg set scripts.postinstall="echo 'Postinstall script is disabled'"
RUN pnpm install --frozen-lockfile
RUN pnpm --filter chat prisma:generate

# Building SocketIO server
RUN pnpx nx run @inc/chat:build:prod

# Remove devDeps
RUN rm -rf node_modules */**/node_modules */**/**/node_modules && pnpm install --frozen-lockfile --prod --offline
RUN pnpm --filter chat prisma:generate

# ===================================================================

FROM node:18.15.0-alpine3.17 as runner

WORKDIR /app
ENV NODE_ENV production

# DATABASE_URL for Prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# CORS
ARG CHAT_CORS
ENV CHAT_CORS=$CHAT_CORS

# Host
ARG CHAT_HOST
ENV CHAT_HOST=$CHAT_HOST

# Log Level
ARG CHAT_LOG_LEVEL
ENV CHAT_LOG_LEVEL=$CHAT_LOG_LEVEL

# Adding user & usergroup for SocketIO's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 socketio

# Copying the dist folder & changing owners
COPY --from=depsbuilder --chown=socketio:nodejs /app/apps/chat ./apps/chat
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages ./packages
COPY --from=depsbuilder --chown=socketio:nodejs /app/node_modules ./node_modules
COPY --from=depsbuilder --chown=socketio:nodejs /app/static ./static

# Remove unnecessary files
RUN rm -rf packages/types
RUN rm -rf packages/configs
RUN ls -d packages/**/** | grep -v "package.json\|node_modules\|dist" | xargs rm -rf
RUN ls -d apps/**/** | grep -v "package.json\|node_modules\|dist" | xargs rm -rf

# Changing user to SocketIO's user
USER socketio

# Ports host at 4000
ARG CHAT_PORT
ENV PORT=$CHAT_PORT
EXPOSE ${CHAT_PORT}

# Socketio server is being run using node server.js
CMD ["node", "apps/chat/dist/server.js"]
