<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class CalculationController extends Controller
{
    public function create()
    {
        $currentUser = auth()->user();

        $roles = Role::where('organization_id', $currentUser->organization_id)->get();
        $organizations = OrganizationController::getOrganizations();

        return Inertia::render('Calculator/Calculation/Create', [
            'organizations' => $organizations,
            'roles' => $roles,
            'user' => $currentUser,
        ]);
    }
}
