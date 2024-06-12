FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install

CMD [ "npm", "run", "dev",  "--", "--host" ]
EXPOSE 5173