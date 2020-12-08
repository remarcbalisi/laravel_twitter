<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserController::class, 'store'])->name('register');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
