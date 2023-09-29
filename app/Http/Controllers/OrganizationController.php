<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = $request->user();

        if ($currentUser->role_id < 999) {
            $organizations = Organization::where('id',  $currentUser->organization_id)->get();
        } else {
            $organizations = Organization::get();
        }

        return Inertia::render('Organizations/ListView', [
            'organizations' => $organizations
        ]);
    }
}
