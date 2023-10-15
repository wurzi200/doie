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
    public function index(Request $request)
    {
        $currentUser = auth()->user();
        $search = $request->query('search');

        if (checkIfSuperAdminAndOrganization()) {
            $organizations = Organization::where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%");
            })
                ->paginate(10)->withQueryString();
        } else {
            $organizations = Organization::where('id', $currentUser->organization_id)
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%");
                })
                ->paginate(10)->withQueryString();
        }

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

    public function delete(Request $request, $organizationId)
    {
        if ($request->user()->organization_id != $organizationId && !$request->user()->hasRole('super-admin-1')) {
            abort(403, 'Unauthorized action.');
        }

        $organization = Organization::where('id', $organizationId)->first();

        $organization->delete();

        return Redirect::route('organizations.index');
    }
}
