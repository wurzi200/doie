<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UserCreationRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = auth()->user();
        $search = $request->query('search');

        if (checkIfSuperAdminAndOrganization()) {
            $users = User::with(['organization', 'roles'])
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%");
                })
                ->paginate(10)->withQueryString();
        } else {
            $users = User::where('organization_id', $currentUser->organization_id)
                ->with(['organization', 'roles'])
                ->whereDoesntHave('roles', function ($query) {
                    $query->where('name', 'super-admin-1');
                })
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%");
                })
                ->paginate(10)->withQueryString();
        }

        return Inertia::render('Users/ListView', [
            'users' => $users
        ]);
    }

    public function getUserById($userId)
    {
        $user = User::where('id', $userId)->with('organization')->with('roles')->first();
        return $user;
    }

    public function edit(Request $request, $userId)
    {
        $user = $this->getUserById($userId);
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
        $user = $this->getUserById($userId);
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

        $user = $this->getUserById($userId);

        $user->delete();
        return Redirect::to('/users');
    }

    public function create()
    {
        $currentUser = auth()->user();

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
            $user->assignRole('newuser-0');
        }

        return Redirect::to('/users');
    }
}
