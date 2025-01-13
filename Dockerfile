FROM node:lts-alpine

WORKDIR /app

# RUN npm install -g pnpm

COPY package.json ./
RUN apk update && apk add bash
RUN npm install --force

COPY . .

EXPOSE 5173
EXPOSE 24678
# CMD [ "npm", "run", "dev", "--","--host" ]
