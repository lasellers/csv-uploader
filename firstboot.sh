#!/bin/bash
php artisan config:clear
php composer.phar dump-autoload
# Wait a few seconds for the db to actually settle
sleep 5s
# then run migrations...
php artisan migrate:refresh --seed
