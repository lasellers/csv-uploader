# sudo docker build -t csvuploader_firstboot -f firstboot.Dockerfile .
# sudo docker run -it --rm -v /var/wwww --name csvuploader_firstboot csvuploader_firstboot

# sudo docker exec -it csvuploader_firstboot /bin/bash
# php -v
# php artisan env
# php artisan --version
# php composer.phar --version
# composer --version
# node -v
# npm -v

# source ./firstboot.sh

FROM php:7.4

# set working directory
WORKDIR /var/www

# install apps
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    nano \
    unzip \
    git \
    curl

# clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# bug fixes for 7.x php fpm
RUN apt-get update && \
    apt-get install -y \
        zlib1g-dev \
        libzip-dev \
        libonig-dev

# install docker extensions
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install zip
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install -j$(nproc) gd

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# user 1000 is the docker default -- we add it as www
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# copy composer.lock and composer.json
COPY ./firstboot.sh ./

# change default user to www/1000, not root
USER www

# change user for content folder to www
COPY --chown=www:www ./api/ .

RUN echo "Migration starting..."

CMD ["./firstboot.sh"]
ENTRYPOINT sleep 5 && /bin/bash /var/www/firstboot.sh
