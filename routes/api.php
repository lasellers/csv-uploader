<?php

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::get('csv/remap-file', 'CsvController@remapFile');
//Route::get('csv/file/{id}', 'CsvController@getFile');
//Route::get('csv/files', 'CsvController@index');
//Route::post('csv/upload', 'CsvController@upload');
//Route::post('csv/process', 'CsvController@process');
//Route::delete('csv/{id}', 'CsvController@destroy');

Route::post('csv/save', 'CsvController@save');

Route::delete('custom-attributes/{id}', 'ContactsController@customAttributesDestroy');
Route::delete('contacts/{id}', 'ContactsController@destroy');
Route::get('contacts', 'ContactsController@index');

Route::get('/', function () {
    return new JsonResponse(['error' => 'Unimplemented Endpoint'], Response::HTTP_METHOD_NOT_ALLOWED);
});

