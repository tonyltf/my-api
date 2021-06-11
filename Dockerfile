FROM node:12.16.1-alpine

WORKDIR /app

# RUN npm install pm2 -g

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "auth"]
