## CSV Uploader

A demo of a CSV file uploader.


## Startup

### 1. Startup with dev tools

`sudo docker-compose -f db.docker-compose.yml up` to start docker db. Then `composer run reseed` to run db migrations and seeds.

`php artisan serve` to start Laravel API server.

`npm run start` to start React frontend.

### 2. Startup with Docker

`sudo docker-compose up` to start docker db. Laravel API will be stood up at localhost:8000.
React will be stood up localhost:80 as a production build.

Then run:
`sudo docker exec -it csvuploader_api bash -c "composer run reseed"`

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

`composer run test` to run all phpunit tests.

`composer run test-unit` to run phpunit unit tests.

`composer run test-integration` to run phpunit integration tests.

`composer run test-feature` to run phpunit feature tests.


### Frontend

`npm run test`

`npm run test:coverage`


## Versions

* v1 Initial
* v2 Refactored folder structure and dockerfiles.
