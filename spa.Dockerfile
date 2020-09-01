# sudo docker build -t csvuploader_spa -f spa.Dockerfile .
# sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 8080:80 -e CHOKIDAR_USEPOLLING=true --name csvuploader_spa csvuploader_spa

# sudo docker exec -it csvuploader_spa /bin/bash
# node -v
# npm -v
# nginx -v

# FROM node:14-buster
FROM node:14

RUN apt-get update && apt-get install -y nginx
RUN rm -v /etc/nginx/nginx.conf
ADD spa.nginx.conf /etc/nginx/conf.d/default.conf
# /usr/share/nginx/html/index.html

WORKDIR /app/SPA
#COPY . .
RUN npm install && npm run build --prod

EXPOSE 80 8080 3000

CMD service nginx start
