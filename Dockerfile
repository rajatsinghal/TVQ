FROM node:alpine

WORKDIR /var/TVQ

COPY package.json .
RUN npm i
COPY . .

CMD ["node", "index.js"]