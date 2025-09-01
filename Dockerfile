ARG BUN_IMAGE=oven/bun:1-alpine

# Base stage
FROM $BUN_IMAGE AS base
WORKDIR /usr/src/app
RUN apk --no-cache add openssh g++ make python3 git wget

# Install dependencies
FROM base AS install
RUN mkdir -p /temp
COPY package.json bun.lock /temp/
RUN cd /temp && bun install --frozen-lockfile

# Build stage
FROM base AS prerelease
WORKDIR /usr/src/app

# Copy dependencies
COPY --from=install /temp/node_modules node_modules

# Copy source
COPY . .

# Build Nuxt
ENV NODE_ENV=production
ENV NITRO_PRESET=bun
RUN bun run build

# Production stage
FROM base AS release

# Copy dependencies
COPY --chown=bun:bun --from=install /temp/node_modules node_modules

# Copy built output
COPY --chown=bun:bun --from=prerelease /usr/src/app/.output .output

USER bun

EXPOSE 3000

# Start server
ENTRYPOINT ["bun", "run", ".output/server/index.mjs"]
