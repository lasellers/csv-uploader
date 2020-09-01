# sudo docker build -t nginx-csv -f nginx.Dockerfile .
# sudo docker run -p 8080:80 nginx-csv
FROM ubuntu:latest

USER root

RUN apt-get update
RUN apt-get install -y nginx nodejs

RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

RUN npm install --silent

ADD ./build /usr/share/nginx/html/
ADD ./build /var/www/html/

RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80

CMD service nginx start
