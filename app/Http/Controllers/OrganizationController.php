<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationUpdateRequest;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();

        if (checkIfSuperAdminAndOrganization()) {
            $organizations = Organization::paginate('10');
        } else {
            $organizations = Organization::where('id', $currentUser->organization_id)->paginate('10');
        }
        // $organizations = Organization::where('id',  $currentUser->organization_id)->get();
        return Inertia::render('Organizations/ListView', [
            'organizations' => $organizations
        ]);
    }

    static function getOrganizations()
    {
        $currentUser = auth()->user();

        if (checkIfSuperAdminAndOrganization()) {
            $organizations = Organization::get();
        } else {
            $organizations = Organization::where('id', $currentUser->organization_id)->get();
        }

        return $organizations;
    }

    public function create()
    {
        return Inertia::render('Organizations/Create', []);
    }

    public function store(Request $request): RedirectResponse
    {
        $organization = Organization::create([
            'name' => $request->name,
        ]);

        $organization->save();

        return Redirect::route('organizations.index');
    }

    public function edit($organizationId)
    {
        $organization = Organization::where('id', $organizationId)->first();

        return Inertia::render('Organizations/Edit', [
            'organization' => $organization,
        ]);
    }

    public function update(OrganizationUpdateRequest $request, $organizationId): RedirectResponse
    {
        $organization = Organization::where('id', $organizationId)->first();
        $organization->fill($request->validated());

        $organization->save();

        return Redirect::route('organization.edit', $organizationId);
    }

    public function delete($organizationId)
    {
        $organization = Organization::where('id', $organizationId)->first();

        $organization->delete();

        return Redirect::route('organizations.index');
    }
}
