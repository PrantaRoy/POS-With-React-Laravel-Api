<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\BrandController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\SupplierController;
use App\Http\Controllers\api\SubCategoryController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',[AuthController::class,'login'])->name('login');

Route::group(['middleware' => 'auth:sanctum'], static function(){
    Route::post('logout',[AuthController::class,'logout']);


    Route::get('category',[CategoryController::class,'index']);
    Route::post('category/store',[CategoryController::class,'store']);
    Route::post('category/edit/{id}',[CategoryController::class,'edit']);
    Route::delete('category/delete/{id}',[CategoryController::class,'delete']);
    Route::post('category/update',[CategoryController::class,'update']);
    Route::get('all-category',[CategoryController::class,'allCategory']);

    Route::get('sub-category',[SubCategoryController::class,'index']);
    Route::post('sub-category/store',[SubCategoryController::class,'store']);
    Route::post('sub-category/edit/{id}',[SubCategoryController::class,'edit']);
    Route::delete('sub-category/delete/{id}',[SubCategoryController::class,'delete']);
    Route::post('sub-category/update',[SubCategoryController::class,'update']);


    Route::get('brand',[BrandController::class,'index']);
    Route::post('brand/store',[BrandController::class,'store']);
    Route::post('brand/edit/{id}',[BrandController::class,'edit']);
    Route::delete('brand/delete/{id}',[BrandController::class,'delete']);
    Route::post('brand/update',[BrandController::class,'update']);


    Route::get('supplier',[SupplierController::class,'index']);
    Route::post('supplier/store',[SupplierController::class,'store']);
    Route::post('supplier/edit/{id}',[SupplierController::class,'edit']);
    Route::delete('supplier/delete/{id}',[SupplierController::class,'delete']);
    Route::post('supplier/update',[SupplierController::class,'update']);
});

