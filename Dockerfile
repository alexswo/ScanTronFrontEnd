FROM node:latest
RUN mkdir -p /frontend
WORKDIR /frontend
COPY package.json ./
RUN npm install --global
COPY . ./
EXPOSE 3000
CMD [ "npm", "start" ]