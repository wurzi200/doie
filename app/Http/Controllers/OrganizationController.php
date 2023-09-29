<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = auth()->user();
        $requiredLevel = PermissionsController::checkRequiredLevel('view_all_organizations');

        if ($requiredLevel) {
            $organizations = Organization::get();
        } else {
            $organizations = Organization::where('id',  $currentUser->organization_id)->get();
        }

        return Inertia::render('Organizations/ListView', [
            'organizations' => $organizations
        ]);
    }
}
