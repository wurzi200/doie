<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UserCreationRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();
        $superAdminCheck = $currentUser->hasRole('super-admin-1'); // check if user is Superadmin

        if ($superAdminCheck) {
            $users = User::with('organization')->with('roles')->paginate('10');
        } else {
            $users = User::where('organization_id', $currentUser->organization_id)->with('organization')->with('roles')->paginate('10');
        }

        return Inertia::render('Users/ListView', [
            'users' => $users
        ]);
    }

    public function edit(Request $request, $userId)
    {
        $currentUser = auth()->user();

        $user = User::where('id', $userId)->with('organization')->with('roles')->first();
        $organizations = OrganizationController::getOrganizations();
        $roles = Role::where('organization_id', $user->organization_id)->get();

        return Inertia::render('Users/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $user,
            'organizations' => $organizations,
            'roles' => $roles,
        ]);
    }

    /**
     * Update other user's profile information.
     */
    public function update(UserUpdateRequest $request, $userId): RedirectResponse
    {
        $user = User::where('id', $userId)->first();
        $role = Role::where('id', $request->get('role_id'))->first();

        $user->syncRoles($role);
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        return Redirect::route('user.edit', $userId);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request, $userId): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = User::where('id', $userId)->with('organization')->with('role')->first();

        $user->delete();
        return Redirect::to('/users');
    }

    public function create()
    {
        $currentUser = auth()->user();
        $currentUser->can('create_user');

        $roles = Role::where('organization_id', $currentUser->organization_id)->get();
        $organizations = OrganizationController::getOrganizations();

        return Inertia::render('Users/Create', [
            'organizations' => $organizations,
            'roles' => $roles,
            'user' => $currentUser,
        ]);
    }

    public function store(UserCreationRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        $user = User::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'organization_id' => $request->organization_id,
            'password' => Hash::make($request->password),
        ]);

        if ($request->role) {
            $user->assignRole($request->role);
        } else {
            $user->assignRole('newuser');
        }

        return Redirect::to('/users');
    }
}
