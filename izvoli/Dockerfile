# ---
# build stage image
# ---
FROM node:24-alpine AS build

# set current directory
WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy source code
COPY public public/
COPY src src/
COPY .prettierrc.json eslint.config.js index.html jsconfig.json vite.config.js ./

# set env for production build
ENV NODE_ENV=production

# run the build
RUN npm run build

# ---
# actual image
# ---
FROM nginx:alpine

# copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# copy custom nginx config to support client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
