FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV PORT 4000
ENV SERVICE_NAME "Real State Api Service"
ENV DATABASE_URL "localhost:5000"

EXPOSE 4000

CMD [ "npm", "run", "dev" ]