<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [UserController::class, 'store'])->name('register');
Route::post('/login', LoginController::class)->name('login');

Route::middleware(['auth:api'])->group(function () {
    Route::get('/auth/user', function () {
        return \Illuminate\Support\Facades\Auth::user();
    });
});

Route::name('user.')->prefix('user')->group(function () {

    Route::middleware(['auth:api', 'role:user'])->group(function () {
        Route::apiResource('user', UserController::class)->except('store');
        Route::apiResource('post', PostController::class)->except('show');
        Route::apiResource('comment', CommentController::class);
    });

    Route::get('/post/{post}', [PostController::class, 'show'])->name('post.show');

    Route::post('/file-upload',App\Http\Controllers\FileUploadController::class)->name('upload');

});
