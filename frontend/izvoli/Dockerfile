# ---
# build stage image
# ---
FROM node:20-alpine as build

# set current directory
WORKDIR /app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# copy source code
COPY public public/
COPY src src/
COPY .eslintrc.cjs .prettierrc.json index.html jsconfig.json vite.config.js ./

# set default NODE_ENV to production
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV:-production}

# set default VITE_API_URL_BASE
ARG VITE_API_URL_BASE
ENV VITE_API_URL_BASE ${VITE_API_URL_BASE:-https://izvoli.eu/api}

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
