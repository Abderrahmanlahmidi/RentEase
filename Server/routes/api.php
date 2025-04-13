<?php

use App\Http\Controllers\SubscribeController;
use Illuminate\Http\Request;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SalleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\QuartierController;
use App\Http\Controllers\ContactFromController;

//User
Route::post("login", [AuthController::class, "login"])->name("login");
Route::post("register", [AuthController::class, "register"])->name("register");
Route::get('users', [AuthController::class, 'index']);
Route::get('user/{id}', [AuthController::class, 'show']);
Route::put('user/update/{id}', [AuthController::class, 'update']);
Route::put('user/password/{id}', [AuthController::class, 'changePassword']);
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
Route::put('/category/update/{id}', [CategorieController::class, 'updateCategory']);

//Salles
Route::post('/salle', [SalleController::class, 'createSalle']);
Route::get('/salles', [SalleController::class, 'displaySalles']);
Route::delete('/salle/{id}', [SalleController::class, 'deleteSalle']);
Route::put('/salle/update/{id}', [SalleController::class, 'updateSalle']);

//Tags
Route::post('/tag', [TagController::class, 'createTag']);
Route::get('/tags', [TagController::class, 'displayTags']);
Route::delete('/tag/{id}', [TagController::class, 'deleteTag']);
Route::put('/tag/update/{id}', [TagController::class, 'updateTag']);

//Blogs
Route::post('/blog', [BlogController::class, 'createBlog']);
Route::get('/blogs', [BlogController::class, 'displayBlogs']);
Route::delete('/blog/{id}', [BlogController::class, 'deleteBlog']);
Route::put('/blog/update/{id}', [BlogController::class, 'updateBlog']);

//quartiers
Route::get('/quartiers', [QuartierController::class, 'displayQuartiers']);

//annonces
Route::post('/annonce', [AnnonceController::class, 'createAnnonce']);
Route::get('/annonces', [AnnonceController::class, 'getAllAnnonces']);
Route::delete('/annonce/{id}', [AnnonceController::class, 'deleteAnnonce']);
Route::get('/findannonce/{id}', [AnnonceController::class, 'findAnnonceById']);

//subscribe
Route::post('/subscribe', [SubscribeController::class, 'createSubscribe']);

//send email
Route::post("/sendmail", [ContactFromController::class, 'sendMail']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post("logout", [AuthController::class, "logout"])->name("logout");
    Route::get("profile", [AuthController::class, "profile"])->name("profile");
});



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

