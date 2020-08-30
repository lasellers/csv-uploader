## CSV Uploader

A demo of a CSV file uploader.


## Startup

`sudo docker-compose up` to start docker db. Then `composer run reseed` to run db migrations and seeds.

`php artisan serve` to start Laravel API server.

`npm run start` to start React frontend.


## Frontend

React, Redux, Component state.


## Backend

PHP Laravel 7 API


## Examples

See examples folder. There are csv files to test various use and error cases.


## Postman

See the file `CSVUploader.postman_collection.json`. This is an export of a postman collection
for the project.

## Testing 

### Backend

`composer run lint` to run the linter.

`composer run lint-fix` to run the linter and fix errors.

`composer run phpstan` to run static analyzer.

`composer run test` to run phpunit tests.


### Frontend

`npm run test`

`npm run test:coverage`


## Versions

v1 Initial