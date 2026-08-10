FROM oven/bun:1.3.14-alpine AS builder

WORKDIR /app

COPY package.json bun.lock turbo.json tsconfig.json ./
COPY apps/bank-webhook/package.json ./apps/bank-webhook/package.json
COPY apps/merchant-app/package.json ./apps/merchant-app/package.json
COPY apps/user-app/package.json ./apps/user-app/package.json
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/store/package.json ./packages/store/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Keep workspace-local dependency links intact so Next can resolve app build
# tools such as Tailwind from apps/user-app/node_modules.
RUN bun install --frozen-lockfile --ignore-scripts --linker=isolated --backend=copyfile

COPY apps ./apps
COPY packages ./packages

RUN bun run --cwd /app/apps/user-app build

FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/user-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/user-app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
