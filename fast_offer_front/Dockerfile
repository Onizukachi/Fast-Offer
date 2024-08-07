FROM node:22.3

ENV NODE_ENV development

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .

EXPOSE 3000

# start app
CMD ["npm", "run", "dev"]