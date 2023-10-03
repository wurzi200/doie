<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('organization')->with('roles')->get();

        // $users = User::where('organization_id',  $currentUser->organization_id)->with('organization')->with('role')->orderByDesc('role_id')->get();

        return Inertia::render('Users/ListView', [
            'users' => $users
        ]);
    }

    public function edit(Request $request, $userId)
    {
        $check = $request->user()->can('edit_user');

        if (true) {
            $user = User::where('id', $userId)->with('organization')->with('roles')->first();
            $organizations = OrganizationController::getOrganizations();
            $roles = Role::get();

            return Inertia::render('Users/Edit', [
                'mustVerifyEmail' => $user instanceof MustVerifyEmail,
                'status' => session('status'),
                'user' => $user,
                'organizations' => $organizations,
                'roles' => $roles,
            ]);
        } else {
            return Redirect::to('/users');
        }
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request, $userId): RedirectResponse
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

        $user = User::where('id', $userId)->with('organization')->with('role')->orderByDesc('role_id')->first();

        $user->delete();
        return Redirect::to('/users');
    }
}
