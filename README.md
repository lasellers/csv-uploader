## CSV Uploader

A demo of a CSV file uploader.


For a video demonstration, see (React):
https://www.youtube.com/watch?v=5emGcn0Cxgc&feature=youtu.be


## Startup

### 1. Startup with local dev servers

`sudo docker-compose -f db.docker-compose.yml up` to start docker db. Then `composer run reseed` to run db migrations and seeds.

`php artisan serve` to start Laravel API server.

`npm run serve` to start React frontend.

`npm run serve` to start VueJs frontend.

Then you can access the React frontend by going to:

`http://localhost:3000`

or the VueJs frontend at:

`http://localhost:8080`


### 2. Startup with Docker

`sudo docker-compose up` to start docker db. Laravel API will be stood up at localhost:8000.
React will be stood up localhost:80 as a production build.

Docker compose will automatically start up a container after a pause to run:

`sudo docker exec -it csvuploader_api bash -c "composer run reseed"`

Then you can access the React frontend by going to:

`http://localhost`

or the VueJs frontend at:

`http://localhost:81`


## Frontend

React, Redux, Component state.
Also VueJs, VueX.


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


### Frontend (React)

`npm run test`

`npm run test:coverage` (todo)


### Frontend (VueJs)

`npm run test`


## Debugging

Use telescope (http://localhost:8000/telescope/requests), Vue DevTools and React DevTools.


## Versions

* v1 Initial
* v2 Refactored folder structure and dockerfiles.
* v3 Added VueJs frontend version based off original React version


## Todo
* Update React tests
* Update React to be a bit more optimal (see VueJs version)
* Add VueJs tests
