FROM node:18.15.0-alpine3.17 as depsbuilder

WORKDIR /app

COPY apps/chat ./apps/chat
COPY packages/configs ./packages/configs
COPY packages/db ./packages/db
COPY packages/errors ./packages/errors
COPY packages/events ./packages/events
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY static ./static
COPY .npmrc nx.json package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Installing Dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Building SocketIO server
RUN pnpx nx run @inc/chat:build:prod

# Remove devDeps
RUN rm -rf node_modules */**/node_modules */**/**/node_modules && pnpm install --prod --offline

# ===================================================================

FROM node:18.15.0-alpine3.17 as runner

WORKDIR /app
ENV NODE_ENV production

# Adding user & usergroup for SocketIO's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 socketio

# Copying the dist folder & changing owners
COPY --from=depsbuilder --chown=socketio:nodejs /app/apps/chat/dist ./apps/chat/dist
COPY --from=depsbuilder --chown=socketio:nodejs /app/apps/chat/node_modules ./apps/chat/node_modules
COPY --from=depsbuilder --chown=socketio:nodejs /app/apps/chat/package.json ./apps/chat/
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/db/dist ./packages/db/dist
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/db/node_modules ./packages/db/node_modules
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/db/package.json ./packages/db/
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/errors/dist ./packages/errors/dist
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/errors/node_modules ./packages/errors/node_modules
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/errors/package.json ./packages/errors/
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/events/index.d.ts /app/packages/events/index.js /app/packages/events/package.json ./packages/events/
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/events/node_modules ./packages/events/node_modules
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/utils/dist ./packages/utils/dist
COPY --from=depsbuilder --chown=socketio:nodejs /app/packages/utils/package.json ./packages/utils/
COPY --from=depsbuilder --chown=socketio:nodejs /app/node_modules ./node_modules
COPY --from=depsbuilder --chown=socketio:nodejs /app/static ./static

# Changing user to SocketIO's user
USER socketio

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# Socketio server is being run using node server.js
CMD ["node", "apps/chat/dist/server.js"]
