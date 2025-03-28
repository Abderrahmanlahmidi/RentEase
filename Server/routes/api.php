<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieController;

//User
Route::post("login", [AuthController::class, "login"])->name("login");
Route::post("register", [AuthController::class, "register"])->name("register");
Route::get('users', [AuthController::class, 'index']);
Route::get('user/{id}', [AuthController::class, 'show']);
Route::put('user/update/{id}', [AuthController::class, 'update']);
Route::put('user/password', [AuthController::class, 'changePassword']);
Route::delete('user/delete/{id}', [AuthController::class, 'deleteUser']);
Route::put('/user/updateRole/{id}', [AuthController::class, 'updateUserRole']);

//Role
Route::get('/roles', [RoleController::class, 'displayRoles']);
Route::post('/role', [RoleController::class, 'createRole']);
Route::delete('/role/{id}', [RoleController::class, 'deleteRole']);
Route::put('/role/{id}', [RoleController::class, 'updateRole']);

//Categories
Route::get('/categories', [CategorieController::class, 'displayCategories']);
Route::post('/category', [CategorieController::class, 'createCategory']);
Route::delete('/category/{id}', [CategorieController::class, 'deleteCategory']);



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post("logout", [AuthController::class, "logout"])->name("logout");
    Route::get("profile", [AuthController::class, "profile"])->name("profile");
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

