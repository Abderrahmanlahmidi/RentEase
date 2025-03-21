<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("login", [AuthController::class, "login"])->name("login");
Route::post("register", [AuthController::class, "register"])->name("register");
Route::get('users', [AuthController::class, 'index']);
Route::get('user/{id}', [AuthController::class, 'show']);
Route::put('user/update/{id}', [AuthController::class, 'update']);
Route::put('user/password', [AuthController::class, 'changePassword']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post("logout", [AuthController::class, "logout"])->name("logout");
    Route::get("profile", [AuthController::class, "profile"])->name("profile");
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

