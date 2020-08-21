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
Route::post('update_transaction', 'APIController@updateTransaction')->name('update_transaction');
Route::delete('delete_transaction', 'APIController@deleteTransaction')->name('delete_transaction');

Route::post('new_category', 'APIController@createCategory')->name('new_category');
Route::post('update_category', 'APIController@updateCategory')->name('update_category');
Route::delete('delete_category', 'APIController@deleteCategory')->name('delete_category');

Route::get('checkBudget', 'APIController@checkBudget');
Route::post('get_pie', 'APIController@getCategoriesPie')->name('get_pie');
Route::get('get_overview', 'APIController@getOverviewGraph')->name('get_overview');

Route::post('get_bars', 'APIController@getCategoryBars')->name('get_bars');
