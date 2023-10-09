<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\SurveyController;
use App\Http\Controllers\Api\UserController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SurveyController::class)->group(function(){
    Route::get('/surveys', 'index');
    Route::post('/survey', 'store');
    Route::get('/survey/{id}', 'show');
    Route::put('/survey/{id}', 'update');
    Route::delete('/survey/{id}', 'destroy');
});

Route::controller(UserController::class)->group(function(){
    Route::post('/login', 'loginUser');
    Route::post('/register', 'registerUser');
});