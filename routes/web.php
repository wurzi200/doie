<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\CalculationController;
use App\Http\Controllers\CalculationTypeController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\InviteController;
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

Route::get('accept/{token}', [InviteController::class, 'accept'])->name('accept');
Route::put('registerInvitedUser', [InviteController::class, 'registerInvitedUser'])->name('registerInvitedUser');

Route::get('/dashboard', function () {
    return Inertia::render('UserDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::put('address/{id}/{type}/create', [AddressController::class, 'create'])->name('address.store');
    Route::post('address/{addressId}/edit', [AddressController::class, 'edit'])->name('address.edit');
    Route::get('address/{addressId}/delete', [AddressController::class, 'delete'])->name('address.delete');

    Route::group(['middleware' => ['user_has_permission:show_customers']], function () {
        Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
        Route::get('/customers/search', [CustomerController::class, 'indexSearch'])->name('customers.search');
    });

    Route::group(['middleware' => ['user_has_permission:create_customers']], function () {
        Route::get('/customer/create', [CustomerController::class, 'create'])->name('customer.create');
        Route::put('/customer/store', [CustomerController::class, 'store'])->name('customer.store');
    });

    Route::group(['middleware' => ['user_has_permission:edit_customers']], function () {
        Route::get('/customer/{customerId}/edit', [CustomerController::class, 'edit'])->name('customer.edit');
        Route::put('/customers/{customerId}/update', [CustomerController::class, 'update'])->name('customer.update');
    });

    Route::group(['middleware' => ['user_has_permission:delete_customers']], function () {
        Route::get('/customer/{customer}/delete', [CustomerController::class, 'destroy'])->name('customer.delete');
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:show_calculation_types']], function () {
        Route::get('/calculationTypes', [CalculationTypeController::class, 'index'])->name('calculationTypes.index');
    });
    Route::group(['middleware' => ['auth', 'user_has_permission:create_calculation_types']], function () {
        Route::get('/calculationTypes/create', [CalculationTypeController::class, 'create'])->name('calculationType.create');
        Route::put('/calculationType/store', [CalculationTypeController::class, 'store'])->name('calculationType.store');
    });
    Route::group(['middleware' => ['auth', 'user_has_permission:edit_calculation_types']], function () {
        Route::get('/calculationType/{calculationType}/edit', [CalculationTypeController::class, 'edit'])->name('calculationType.edit');
        Route::put('/calculationType/{calculationType}/update', [CalculationTypeController::class, 'update'])->name('calculationType.update');
    });
    Route::group(['middleware' => ['auth', 'user_has_permission:delete_calculation_types']], function () {
        Route::get('/calculationType/{calculationType}/destroy', [CalculationTypeController::class, 'destroy'])->name('calculationType.destroy');
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:show_calculations']], function () {
        Route::get('/calculations', [CalculationController::class, 'index'])->name('calculations.index');
    });
    Route::group(['middleware' => ['auth', 'user_has_permission:create_calculations']], function () {
        Route::get('/calculation/create', [CalculationController::class, 'create'])->name('calculation.create');
        Route::put('/calculation/store', [CalculationController::class, 'store'])->name('calculation.store');
        Route::post('/calculate', [CalculationController::class, 'calculate'])->name('calculate');
    });
    Route::group(['middleware' => ['auth', 'user_has_permission:edit_calculations']], function () {
        Route::get('/calculations/{calculation}/edit', [CalculationController::class, 'edit'])->name('calculation.edit');
        Route::patch('/calculations/{calculation}/update', [CalculationController::class, 'update'])->name('calculation.update');
    });
    Route::group(['middleware' => ['auth', 'user_has_permission:delete_calculations']], function () {
        Route::get('/calculations/{calculation}/delete', [CalculationController::class, 'destroy'])->name('calculation.destroy');
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:print_calculations']], function () {
        Route::get('/calculation/{calculationId}/print', [DocumentController::class, 'printCalculation'])->name('calculation.print');
    });


    // Route::get('/calculations/{calculation}', [CalculationController::class, 'show'])->name('calculation.show');

    //Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Users
    Route::group(['middleware' => ['auth', 'user_has_permission:show_users']], function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:create_users']], function () {
        Route::get('/user/create', [UserController::class, 'create'])->name('user.create');
        Route::put('/user/store', [UserController::class, 'store'])->name('user.store');

        //Invite Users
        Route::get('invite', [InviteController::class, 'invite'])->name('invite');
        Route::post('invite', [InviteController::class, 'process'])->name('process');
        // {token} is a required parameter that will be exposed to us in the controller method
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:edit_users']], function () {
        Route::get('/user/{userId}', [UserController::class, 'edit'])->name('user.edit');
        Route::patch('/user/{userId}/update', [UserController::class, 'update'])->name('user.update');
        Route::put('changePassword/{userId}/update', [PasswordController::class, 'change'])->name('changePassword.update');
        Route::delete('/user/{userId}/destroy', [UserController::class, 'destroy'])->name('user.destroy');
    });

    // Organizations
    Route::group(['middleware' => ['auth', 'user_has_permission:show_organizations']], function () {
        Route::get('/organizations', [OrganizationController::class, 'index'])->name('organizations.index');
    });

    Route::group(['middleware' => ['auth', 'role:super-admin-1']], function () {
        Route::get('/organization/create', [OrganizationController::class, 'create'])->name('organization.create');
        Route::put('/organization/store', [OrganizationController::class, 'store'])->name('organization.store');
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:edit_organizations']], function () {
        Route::get('/organization/{organizationId}/edit', [OrganizationController::class, 'edit'])->name('organization.edit');
        Route::patch('/organization/{organizationId}/update', [OrganizationController::class, 'update'])->name('organization.update');
        Route::post('/organization/{organizationId}/uploadLogo', [OrganizationController::class, 'uploadLogo'])->name('organization.uploadLogo');

        Route::get('/organization/{organizationId}/delete', [OrganizationController::class, 'delete'])->name('organization.delete');
    });

    //Roles
    Route::group(['middleware' => ['auth', 'user_has_permission:show_roles']], function () {
        Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:create_roles']], function () {
        Route::get('/role/create', [RoleController::class, 'create'])->name('role.create');
        Route::put('/role/store', [RoleController::class, 'store'])->name('role.store');
    });

    Route::group(['middleware' => ['auth', 'user_has_permission:edit_roles']], function () {
        Route::get('/role/{roleId}/edit', [RoleController::class, 'edit'])->name('role.edit');
        Route::get('/role/{roleId}/delete', [RoleController::class, 'delete'])->name('role.delete');
        Route::patch('/role/{roleId}/update', [RoleController::class, 'update'])->name('role.update');
        Route::post('/togglePermission', [RoleController::class, 'togglePermission'])->name('role.togglePermission');
    });

    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');

    //invite
    Route::group(['middleware' => ['auth', 'role:super-admin-1']], function () {
        Route::get('/invite-admin', function () {
            return Inertia::render('Invite/InviteAdmin');
        })->name('invite-admin.index');
    });
});

// Route::get('/todos', [TodosController::class, 'index'])->name('todos.index');
// Route::post('/addTodo', [TodosController::class, 'add'])->name('todos.add');
// Route::post('/updateTodo', [TodosController::class, 'update'])->name('todos.update');
// Route::post('/deleteTodo', [TodosController::class, 'delete'])->name('todos.delete');

require __DIR__ . '/auth.php';
