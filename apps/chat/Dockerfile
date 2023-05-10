FROM node:18.15.0-alpine3.17 as depsbuilder

WORKDIR /app

COPY . .
# COPY package.json ./
# COPY pnpm-lock.yaml ./

# COPY apps/chat ./apps/chat
# COPY packages ./packages

# Installing Dependencies
RUN npm install -g pnpm && pnpm clean-i

# Building SocketIO server
RUN npx nx run @inc/chat:build

# ===================================================================

FROM node:18.15.0-alpine3.17 as runner

WORKDIR /app
ENV NODE_ENV production

# Adding user & usergroup for SocketIO's node server
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 socketio

# Copying the dist folder & changing owners
COPY --from=depsbuilder --chown=socketio:nodejs /app/apps/chat ./



# Changing user to SocketIO's user
USER socketio

# Ports host at 3000
EXPOSE 3000
ENV PORT 3000

# Socketio server is being run using node server.js
CMD ["node", "dist/server.js"]