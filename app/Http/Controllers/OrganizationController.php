<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        $organizations = Organization::get();

        return Inertia::render('Organizations/ListView', [
            'organizations' => $organizations
        ]);
    }
}
