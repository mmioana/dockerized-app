FROM node:9.6.1 as builder
RUN mkdir /usr/src/react-app
WORKDIR /usr/src/react-app
ENV PATH /usr/src/react-app/node_modules/.bin:$PATH
COPY package.json /usr/src/react-app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /usr/src/react-app
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/react-app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]