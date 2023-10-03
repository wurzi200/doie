<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::all();

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
}
