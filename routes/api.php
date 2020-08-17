<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'APIController@login')->name('login');
    Route::post('register', 'APIController@register')->name('register');
});

Route::get('get_transactions', 'APIController@getTransactions')->name('get_transactions');
Route::post('new_transaction', 'APIController@createTransaction')->name('new_transaction');
Route::post('new_category', 'APIController@createCategory')->name('new_category');
