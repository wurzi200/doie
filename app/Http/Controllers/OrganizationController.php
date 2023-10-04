<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();
        $organizations = Organization::paginate('10');

        // $organizations = Organization::where('id',  $currentUser->organization_id)->get();
        return Inertia::render('Organizations/ListView', [
            'organizations' => $organizations
        ]);
    }

    static function getOrganizations()
    {
        $currentUser = auth()->user();

        $organizations = Organization::get();

        //$organizations = Organization::where('id',  $currentUser->organization_id)->get();


        return $organizations;
    }
}
