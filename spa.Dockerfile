## docker
# sudo docker build -t csvuploader_spa -f spa.Dockerfile .
# sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 80:80 -p 443:443 -name csvuploader_spa csvuploader_spa

## docker-compose
# sudo docker exec -it csvuploader_spa /bin/bash
# node -v
# npm -v
# nginx -v
# nginx -t

# cat /var/log/nginx/spa.error.log

# /etc/init.d/nginx status
# /etc/init.d/nginx start

# systemctl nginx status
# systemctl nginx reload nginx
# systemctl nginx stop nginx
# systemctl nginx start nginx

FROM node:12-buster

RUN apt-get update && apt-get install -y nginx nano
RUN rm -v /etc/nginx/nginx.conf
#ADD spa.nginx.conf /etc/nginx/conf.d/default.conf
ADD spa.nginx.conf /etc/nginx/nginx.conf

#USER node
ENV CHOKIDAR_USEPOLLING=${CHOKIDAR_USEPOLLING}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV PUBLIC_URL=${PUBLIC_URL}

WORKDIR /app

COPY ./spa/package*.json ./

RUN chown -R node:node /app
USER node
RUN npm install
COPY --chown=node:node ./spa/ ./

RUN npm run build

EXPOSE 80 443

USER root

#CMD ["nginx", "-g", "daemon off;"]
CMD ["nginx"]
