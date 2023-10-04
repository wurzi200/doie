<?php

use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TodosController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Routing\Route as RoutingRoute;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/organizations', [OrganizationController::class, 'index'])->name('organizations.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::group(['middleware' => ['auth']], function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');

        Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
        Route::put('/user/store', [UserController::class, 'store'])->name('user.store');

        Route::get('/user/{userId}', [UserController::class, 'edit'])->name('user.edit');
        Route::patch('/user/{userId}/update', [UserController::class, 'update'])->name('user.update');
        Route::delete('/user/{userId}/destroy', [UserController::class, 'destroy'])->name('user.destroy');
        Route::put('changePassword/{userId}/update', [PasswordController::class, 'change'])->name('changePassword.update');




        Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
        Route::get('/role/create', [RoleController::class, 'create'])->name('role.create');
        Route::put('/role/store', [RoleController::class, 'store'])->name('role.store');
        Route::get('/role/{roleId}/edit', [RoleController::class, 'edit'])->name('role.edit');
        Route::get('/role/{roleId}/delete', [RoleController::class, 'delete'])->name('role.delete');
        Route::post('/togglePermission', [RoleController::class, 'togglePermission'])->name('role.update');

        Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');
    });

    Route::group(['middleware' => ['auth', 'permission:edit_user']], function () {
    });

    Route::group(['middleware' => ['auth', 'permission:edit_organization']], function () {
    });

    Route::group(['middleware' => ['auth', 'permission:edit_role']], function () {
    });

    Route::group(['middleware' => ['auth', 'permission:edit_permission']], function () {
    });
});

// Route::get('/todos', [TodosController::class, 'index'])->name('todos.index');
// Route::post('/addTodo', [TodosController::class, 'add'])->name('todos.add');
// Route::post('/updateTodo', [TodosController::class, 'update'])->name('todos.update');
// Route::post('/deleteTodo', [TodosController::class, 'delete'])->name('todos.delete');

require __DIR__ . '/auth.php';
