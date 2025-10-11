# use the official Bun image (debian variant for better memory management)
FROM oven/bun:1-debian AS build
WORKDIR /app

COPY package.json bun.lock ./

# use ignore-scripts to avoid building node modules like better-sqlite3
RUN bun install --frozen-lockfile --ignore-scripts

# Copy the entire project
COPY . .

# Increase Node memory limit for build (common fix for Nuxt prerenderer OOM)
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN bun --bun run build

# copy production dependencies and source code into final image
FROM oven/bun:1-debian AS production
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output /app

# run the app
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "--bun", "run", "/app/server/index.mjs" ]
