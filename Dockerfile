FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# 生产阶段
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
