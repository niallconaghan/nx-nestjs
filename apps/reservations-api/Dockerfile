FROM node:alpine as development
RUN apk add g++ make py3-pip
WORKDIR /usr/src/app

COPY package.json ./
# COPY package-lock.json ./

COPY . .

RUN npm install

RUN npx nx run reservations-api:build

FROM node:alpine as production
RUN apk add g++ make py3-pip

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
# COPY package-lock.json ./

RUN npm install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations-api/main"]
