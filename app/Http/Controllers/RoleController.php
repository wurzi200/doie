<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleUpdateRequest;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();
        $roles = Role::where('organization_id', $currentUser->organization_id)->paginate('10');
        return Inertia::render('Roles/ListView', [
            'roles' => $roles
        ]);
    }

    public function getRoles()
    {
        $currentUser = auth()->user();
        $roles = Role::where('organization_id', $currentUser->organization_id)->paginate('10');
        return $roles;
    }

    public function edit($roleId)
    {
        $currentUser = auth()->user();

        $permissions = Permission::all();
        $role = Role::where('id', $roleId)->with('permissions')->first();
        $organization = Organization::where('id', $currentUser->organization_id)->first();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
            'organization' => $organization,
        ]);
    }

    public function update(Request $request, $roleId): RedirectResponse
    {
        $role = Role::where('id', $roleId)->first();

        $display_name = $request->name;

        $request->merge([ // change request name
            'name' => $request->name . '-' . $request->organization_id,
        ]);

        $request->validate([
            'name' => ['required', Rule::unique(Role::class)],
        ]);

        $role->update([
            'name' => $request->name,
            'display_name' => $display_name,
            'guard_name' => 'web',
            'organization_id' => $request->organization_id,
        ]);

        $role->save();

        return Redirect::route('role.edit', $roleId);
    }

    public function delete($roleId)
    {
        $role = Role::where('id', $roleId)->first();

        $role->delete();

        return Redirect::route('roles.index');
    }

    public function togglePermission(Request $request)
    {
        $value = $request->input('value');
        $roleId = $request->input('role');
        $role = Role::where('id', $roleId)->first();
        $permission = $request->input('permission');

        // if $value is true means that the role has the permission currently and it revokes it with that call
        if ($value) {
            $role->revokePermissionTo($permission);
        } else {
            $role->givePermissionTo($permission);
        }
    }

    public function create()
    {
        $currentUser = auth()->user();
        $organizations = Organization::get();

        return Inertia::render('Roles/Create', [
            'organizations' => $organizations,
            'user' => $currentUser,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $display_name = $request->name;
        $request->merge([ // change request name
            'name' => $request->name . '-' . $request->organization_id,
        ]);

        $request->validate([
            'name' => ['required', Rule::unique(Role::class)],
        ]);

        $role = Role::create([
            'name' => $request->name,
            'display_name' => $display_name,
            'guard_name' => 'web',
            'organization_id' => $request->organization_id,
        ]);

        $role->save();

        return Redirect::route('roles.index');
    }
}
