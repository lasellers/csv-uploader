FROM nginx:stable

## docker
# sudo docker build -t csvuploader_spa -f apiweb.Dockerfile .
# sudo docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 80:80 -p 443:443 --name csvuploader_apiweb csvuploader_apiweb

## docker-compose
# sudo docker exec -it csvuploader_apiweb /bin/bash
# nginx -v
# nginx -t

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

WORKDIR /var/www

COPY apiweb.nginx.conf /etc/nginx/nginx.conf

COPY ./api/composer*.json ./

COPY ./api/ ./

#EXPOSE 80 443

#CMD ["nginx", "-g", "daemon off;"]
#CMD ["nginx"]
