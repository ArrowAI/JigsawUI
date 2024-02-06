# ## Build
FROM node:13-alpine as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install -g @angular/cli@latest
RUN  ng build   --build-optimizer=false --output-path=dist


FROM nginx:1.17-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN sed -i 's/listen[[:space:]]*80;/listen 5000;/g' /etc/nginx/conf.d/default.conf
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]
