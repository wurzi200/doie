<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrganizationUpdateRequest;
use App\Models\Organization;
use App\Models\OrganizationType;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

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
                ->with('organizationType')->paginate(10)->withQueryString();
        } else {
            $organizations = Organization::where('id', $currentUser->organization_id)
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%");
                })
                ->with('organizationType')->paginate(10)->withQueryString();
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

        $roleController = new RoleController();
        $roleController->createBasicRoles($organization->id);

        return Redirect::route('organizations.index');
    }

    public function edit(Request $request, $organizationId)
    {
        if ($request->user()->organization_id != $organizationId && !$request->user()->hasRole('super-admin-1')) {
            abort(403, 'Unauthorized action.');
        }

        $organization = Organization::where('id', $organizationId)->first();
        $types = OrganizationType::get();
        $logoUrl = null;

        if ($organization->logo) {
            $logoUrl = asset('storage/' . $organization->logo);
        }
        $organization->addresses;
        return Inertia::render('Organizations/Edit', [
            'organization' => $organization,
            'types' => $types,
            'logoUrl' => $logoUrl,
        ]);
    }

    public function update(OrganizationUpdateRequest $request, $organizationId)
    {
        $organization = Organization::where('id', $organizationId)->first();
        $organization->fill($request->validated());

        // addDay() becaue datepicker is weird might change this later
        $establishment_date = Carbon::parse($request->input('establishment_date'))->addDay()->format('Y-m-d');
        $organization->establishment_date = $establishment_date;

        $organization->save();
    }

    public function uploadLogo(Request $request, $organizationId): RedirectResponse
    {
        $organization = Organization::where('id', $organizationId)->first();

        $request->validate([
            'logo' => 'required|image|max:6048',
        ]);

        if ($request->hasFile('logo')) {
            $files = $request->allFiles();
            $file = $files['logo'];
            if ($organization->logo) {
                Storage::disk('public')->delete($organization->logo);
            }

            $path = $file->store('uploads/logos', 'public');

            $organization->logo = $path;
            $organization->save();
        }

        // $organization->fill($request->validated());

        // $organization->save();

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
