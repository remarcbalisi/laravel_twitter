<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserController::class, 'store'])->name('register');
Route::post('/login', LoginController::class)->name('login');

Route::name('user.')->prefix('user')->group(function () {

    Route::middleware(['auth:api', 'role:user'])->group(function () {
        Route::apiResource('user', UserController::class)->except('store');
    });

});
