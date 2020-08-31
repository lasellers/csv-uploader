# sudo docker build -t nginx-csv -f nginx.Dockerfile .
# sudo docker run -p 8080:80 nginx-csv
FROM ubuntu:latest

USER root

RUN apt-get update
RUN apt-get install -y nginx nodejs

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/

ADD . /usr/share/nginx/html/
ADD . /var/www/html/

#COPY public /var/www/html/
#COPY src /var/www/html/
#COPY examples /var/www/html/
#COPY build /var/www/html/
#COPY .env* /var/www/html/
#COPY . /var/www/html/

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 90

# Set the default command to execute
# when creating a new container
CMD service nginx start
