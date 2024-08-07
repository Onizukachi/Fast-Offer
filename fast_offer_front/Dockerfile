FROM node:22.3

WORKDIR /app
COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

# start app
CMD ["npm", "run", "dev"]