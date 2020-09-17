# sudo docker build -t csvuploader_api -f api.Dockerfile .

# sudo docker exec -it csvuploader_api /bin/bash
# php -v
# php artisan env
# php artisan --version
# php composer.phar --version
# composer --version
# node -v
# npm -v

# composer install
# composer run reseed

# composer run lint
# composer run lint-fix

# sudo docker exec -it csvuploader_api bash -c "composer run reseed"

FROM php:7.4-fpm

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

# for 7.3-fpm added libzip-dev for bug fix for docker-php-ext-install zip
# for 7.4-fpm added libonig-dev
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
#RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
#RUN docker-php-ext-install gd
RUN docker-php-ext-install -j$(nproc) gd

# install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# user 1000 is the docker default -- we add it as www
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# copy composer.lock and composer.json
COPY ./api/composer.lock ./api/composer.json ./

# change user for content folder to www
COPY --chown=www:www ./api/ .

# change default user to www/1000, not root
USER www

# Setup required folders that might be gitignored as they can be empty
RUN mkdir -p storage && \
    mkdir -p storage/framework && \
    mkdir -p storage/framework/cache && \
    mkdir -p storage/framework/sessions && \
    mkdir -p storage/framework/views

# initial modules and db setup
RUN php artisan config:clear
RUN php composer.phar dump-autoload
# install but without dev tools, and no interactive questions
#RUN yes yes | composer install --no-dev --no-interaction -o
RUN yes yes | composer install --no-interaction -o

# expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
