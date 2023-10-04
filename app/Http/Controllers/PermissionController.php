<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::paginate('10');

        return Inertia::render('Permissions/ListView', [
            'permissions' => $permissions
        ]);
    }
}
