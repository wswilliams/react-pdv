FROM node:14-slim

WORKDIR /usr/app
COPY ./api-server/package*.json  /usr/app/
RUN npm install  && npm install --loglevel=error
COPY . .
EXPOSE 3355

CMD ["npm","start"]
