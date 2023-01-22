###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .



###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

ARG MAILJET_API_KEY
ARG MAILJET_SECRET_KEY
ARG MONGO_INITDB_ROOT_USERNAME
ARG MONGO_INITDB_ROOT_PASSWORD
ARG MONGO_INITDB_DATABASE

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

RUN touch .env

RUN echo "MAILJET_API_KEY=$MAILJET_API_KEY" >> .env
RUN echo "MAILJET_SECRET_KEY=$MAILJET_SECRET_KEY" >> .env
RUN echo "MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME" >> .env
RUN echo "MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD" >> .env
RUN echo "MONGO_INITDB_DATABASE=$MONGO_INITDB_DATABASE" >> .env
