<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\MoviesController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Lista os filmes na home (trend)
Route::get('list', 'App\Http\Controllers\API\MoviesController@index');

//Lista os gêneros de filmes
Route::get('genres', 'App\Http\Controllers\API\MoviesController@genres');

//Busca os filmes baseado na query
Route::get('search', 'App\Http\Controllers\API\MoviesController@search');

//Detalhes de um filme
Route::get('detail/{movie_id}', 'App\Http\Controllers\API\MoviesController@detail');

//Pega a url base das imagens
Route::get('baseurl', 'App\Http\Controllers\API\MoviesController@baseUrl');
