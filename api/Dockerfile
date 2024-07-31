FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV PORT 4000
ENV SERVICE_NAME "Real State Api Service"
ENV DATABASE_URL "mongodb://mongo-db:27017/real-state"

EXPOSE 4000

CMD [ "npm", "run", "dev" ]