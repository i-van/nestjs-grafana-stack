FROM node:18-alpine as intermediate
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --from=intermediate /usr/src/app /usr/src/app
EXPOSE 3000
CMD [ "npm", "start" ]
