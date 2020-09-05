## docker
# sudo docker build -t csvuploader_spa -f spa.Dockerfile .
# sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -p 3001:80 --name csvuploader_spa csvuploader_spa

## docker-compose
# sudo docker exec -it csvuploader_spa /bin/bash
# node -v
# npm -v
# nginx -v
# nginx -t
# lsb_release -a
# systemctl nginx status
# cat /var/log/nginx/error.log

# systemctl nginx reload nginx
# systemctl nginx stop nginx
# systemctl nginx start nginx

# /etc/init.d/nginx status
# /etc/init.d/nginx start

FROM node:12-buster

ENV CHOKIDAR_USEPOLLING=${CHOKIDAR_USEPOLLING}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV PUBLIC_URL=${PUBLIC_URL}

RUN apt-get update && apt-get install -y nginx nano
RUN rm -v /etc/nginx/nginx.conf
ADD spa.nginx.conf /etc/nginx/conf.d/default.conf
ADD spa.nginx.conf /etc/nginx/nginx.conf
# RUN echo 'This is not the page you're looking for.' > /usr/share/nginx/html/index.html

WORKDIR /app
COPY ./spa/package.* .
#RUN npm clean-install && npm run build

EXPOSE 80 3000 81

# RUN /etc/init.d/nginx start
#CMD ["nginx", "-g", "daemon off;"]
CMD ["nginx"]