FROM nginx:stable

## docker
# sudo docker build -t csvuploader_spa -f apiweb.Dockerfile .
# sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -p 3001:80 --name csvuploader_spa csvuploader_spa

## docker-compose
# sudo docker exec -it csvuploader_apiweb /bin/bash
# node -v
# npm -v
# nginx -v
# nginx -t
# lsb_release -als

# systemctl nginx status
# cat /var/log/nginx/error.log

# systemctl nginx reload nginx
# systemctl nginx stop nginx
# systemctl nginx start nginx

# /etc/init.d/nginx status
# /etc/init.d/nginx start

##
# sudo docker build -t csvuploader_apiweb -f apiweb.Dockerfile .
# sudo docker exec -it csvuploader_apiweb sh

#ENV CHOKIDAR_USEPOLLING=${CHOKIDAR_USEPOLLING}
#ENV PUBLIC_URL=${PUBLIC_URL}

WORKDIR /var/www

#RUN apt-get update && apt-get install -y nginx nano
#RUN apt-get update && apt-get install -y nano
#RUN rm -v /etc/nginx/nginx.conf

#RUN echo 'This is not the page you're looking for.' > /usr/share/nginx/html/index.html

COPY apiweb.nginx.conf /etc/nginx/nginx.conf
COPY ./api/ ./

#ADD apiweb.nginx.conf /etc/nginx/conf.d/default.conf
#ADD apiweb.nginx.conf /var/www

#EXPOSE 80 443

# RUN /etc/init.d/nginx start
#CMD ["nginx", "-g", "daemon off;"]
#CMD ["nginx"]
