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

FROM php:7.4-fpm

# Copy composer.lock and composer.json
COPY ./api/composer.lock ./api/composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
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

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# for 7.3-fpm added libzip-dev for bug fix for docker-php-ext-install zip
# for 7.4-fpm added libonig-dev
RUN apt-get update && \
    apt-get install -y \
        zlib1g-dev \
        libzip-dev \
        libonig-dev

# Install extensions
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install zip
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
#RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
#RUN docker-php-ext-install gd
RUN docker-php-ext-install -j$(nproc) gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
#COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY ./api /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Remove any old logs
RUN rm storage/logs/*.log

# Change current user to www
USER www

RUN composer install && composer run reseed

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
