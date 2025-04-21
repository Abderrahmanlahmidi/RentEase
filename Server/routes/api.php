<?php

use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\VisitController;
use Illuminate\Http\Request;
use App\Http\Controllers\AnnonceController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SalleController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\QuartierController;
use App\Http\Controllers\ContactFromController;
use App\Http\Controllers\NotificationController;

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
Route::post('/review', [ReviewController::class, 'createReview']);
Route::get('/reviews', [ReviewController::class, 'displayReviews']);
Route::delete('/review/{id}', [ReviewController::class, 'deleteReview']);
Route::put('/review/update/{id}', [ReviewController::class, 'updateReview']);

//quartiers
Route::get('/quartiers', [QuartierController::class, 'displayQuartiers']);

//annonces
Route::post('/annonce', [AnnonceController::class, 'createAnnonce']);
Route::get('/annonces', [AnnonceController::class, 'getAllAnnonces']);
Route::delete('/annonce/{id}', [AnnonceController::class, 'deleteAnnonce']);
Route::get('/findannonce/{id}', [AnnonceController::class, 'findAnnonceById']);

//subscribe
Route::post('/subscribe', [SubscribeController::class, 'createSubscribe']);

//Notification
Route::get('/notifications', [NotificationController::class, 'Notifications']);
Route::post('/notification', [NotificationController::class, 'createNotification']);
Route::delete('/notification/delete/{id}', [NotificationController::class, 'deleteNotification']);

//Visits
Route::get('/visits', [VisitController::class, 'index']);
Route::post('/visit', [VisitController::class, 'store']);
Route::get('/ownervists/{id}', [VisitController::class, 'getVisitsByOwner']);
Route::put('/visit/status/{id}', [VisitController::class, 'updateStatus']);
Route::delete('/visit/delete/{id}', [VisitController::class, 'destroy']);



//send email
Route::post("/sendmail", [ContactFromController::class, 'sendMail']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post("logout", [AuthController::class, "logout"])->name("logout");
    Route::get("profile", [AuthController::class, "profile"])->name("profile");
});



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

