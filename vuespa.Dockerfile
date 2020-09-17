## docker
# sudo docker build -t csvuploader_spa -f vuespa.Dockerfile .
# sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 80:80 -p 443:443 -name csvuploader_vuespa csvuploader_vuespa

## docker-compose
# sudo docker exec -it csvuploader_vuespa /bin/bash
# node -v
# npm -v
# nginx -v
# nginx -t

# cat /var/log/nginx/vuespa.error.log

# /etc/init.d/nginx status
# /etc/init.d/nginx start

# systemctl nginx status
# systemctl nginx reload nginx
# systemctl nginx stop nginx
# systemctl nginx start nginx

FROM node:12-buster

RUN apt-get update && apt-get install -y nginx nano
RUN rm -v /etc/nginx/nginx.conf
#ADD vuespa.nginx.conf /etc/nginx/conf.d/default.conf
ADD vuespa.nginx.conf /etc/nginx/nginx.conf

#USER node
ENV CHOKIDAR_USEPOLLING=${CHOKIDAR_USEPOLLING}
ENV VUE_APP_API_URL=${VUE_APP_API_URL}
ENV PUBLIC_URL=${PUBLIC_URL}

WORKDIR /app

COPY ./vuespa/package*.json ./

RUN chown -R node:node /app
USER node
RUN npm install
COPY --chown=node:node ./vuespa/ ./

RUN rm dist/* -rf
RUN npm run build

RUN  ln -s /app/dist /app/build

EXPOSE 80 443

USER root

#CMD ["nginx", "-g", "daemon off;"]
CMD ["nginx"]
