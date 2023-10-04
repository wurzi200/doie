<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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

    public function edit($roleId)
    {
        $permissions = Permission::all();
        $role = Role::where('id', $roleId)->with('permissions')->first();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
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
        $role = Role::create([
            'name' => $request->name . '-' . $request->organization_id,
            'display_name' => $request->name,
            'guard_name' => 'web',
            'organization_id' => $request->organization_id,
        ]);

        $role->save();

        return Redirect::route('roles.index');
    }
}
