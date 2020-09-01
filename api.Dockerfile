# sudo docker build -t csvuploader_api -f api.Dockerfile .

# sudo docker exec -it csvuploader_api /bin/bash
# php -v
# php artisan env

FROM digitalocean.com/php

COPY ./API ./

RUN php ./composer.phar reseed

# FROM php:7.3.2-fpm-stretch
#
# # sudo apt install php-pear
# RUN apt-get update && \
#     pecl channel-update pecl.php.net && \
#     docker-php-ext-install mysqli pdo pdo_mysql && \
#     pecl install apcu igbinary mongodb && \
#     # compile Redis with igbinary support
#     pecl bundle redis && cd redis && phpize && ./configure --enable-redis-igbinary && make && make install && \
#     docker-php-ext-install bcmath sockets && \
#     docker-php-ext-enable apcu igbinary mongodb opcache redis && \
#     docker-php-source delete
#
# RUN echo '\
# opcache.interned_strings_buffer=16\n\
# opcache.load_comments=Off\n\
# opcache.max_accelerated_files=16000\n\
# opcache.save_comments=Off\n\
# ' >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini

# EXPOSE 80