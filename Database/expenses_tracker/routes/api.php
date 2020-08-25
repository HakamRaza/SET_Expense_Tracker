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
    Route::post('login', 'UserController@login')->name('login');
    Route::post('register', 'UserController@register')->name('register');
    Route::get('logout', 'UserController@logout')->name('logout');
});

Route::group(['middleware' => ['jwt.verify']], function () {
    Route::post('get_transactions', 'TransactionController@getTransactions')->name('get_transactions');
    Route::post('new_transaction', 'TransactionController@createTransaction')->name('new_transaction');
    Route::post('update_transaction', 'TransactionController@updateTransaction')->name('update_transaction');
    Route::delete('delete_transaction', 'TransactionController@deleteTransaction')->name('delete_transaction');

    Route::get('get_categories', 'CategoriesController@getCategories')->name('get_categories');
    Route::post('new_category', 'CategoriesController@createCategory')->name('new_category');
    Route::post('update_category', 'CategoriesController@updateCategory')->name('update_category');
    Route::delete('delete_category', 'CategoriesController@deleteCategory')->name('delete_category');

    Route::post('get_pie', 'GraphController@getCategoriesPie')->name('get_pie');
    Route::post('get_overview', 'GraphController@getOverviewData')->name('get_overview');

    Route::post('get_bars', 'GraphController@getCategoryBars')->name('get_bars');
});
