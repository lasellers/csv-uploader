#!/bin/bash
#sudo docker-compose up
#sudo docker exec -it csvuploader_api bash -c "composer run reseed"
php artisan config:clear
php composer.phar dump-autoload
# yes yes | composer install --no-dev --no-interaction -o
# yes yes | composer install --no-interaction -o
sleep 5s
#composer run reseed
php artisan migrate:refresh --seed
