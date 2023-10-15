<?php

namespace App\Http\Controllers;

use App\Http\Requests\CalculationTypeRequest;
use App\Models\CalculationType;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CalculationTypeController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = auth()->user();
        $search = $request->query('search');

        if (checkIfSuperAdminAndOrganization()) {
            $calculationTypes = CalculationType::where(function ($query) use ($search) {
                $query->where('name', 'like', "%$search%");
            })
                ->paginate(10)->withQueryString();
        } else {
            $calculationTypes = CalculationType::where('organization_id', $currentUser->organization_id)
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%");
                })
                ->paginate(10)->withQueryString();
        }

        return Inertia::render('CalculationTypes/ListView', [
            'calculationTypes' => $calculationTypes
        ]);
    }

    public function create()
    {
        return Inertia::render('CalculationTypes/Create');
    }


    public function store(CalculationTypeRequest $request): RedirectResponse
    {
        $currentUser = auth()->user();

        $request->user()->fill($request->validated());

        CalculationType::create([
            'name' => $request->name,
            'minCost' => $request->minCost,
            'maxCost' => $request->maxCost,
            'minSpecial' => $request->minSpecial,
            'maxSpecial' => $request->maxSpecial,
            'minResidual' => $request->minResidual,
            'maxResidual' => $request->maxResidual,
            'minInterest' => $request->minInterest,
            'maxInterest' => $request->maxInterest,
            'minDuration' => $request->minDuration,
            'maxDuration' => $request->maxDuration,
            'type' => $request->type,
            'organization_id' => auth()->user()->organization_id,
        ]);

        return Redirect::to('/calculationTypes');
    }

    public function edit($calculationTypeId)
    {
        $calculationType = CalculationType::where('id', $calculationTypeId)->first();

        return Inertia::render('CalculationTypes/Edit', [
            'calculationType' => $calculationType,
        ]);
    }

    public function update(CalculationTypeRequest $request, $calculationTypeId)
    {
        $calculationType = CalculationType::findOrFail($calculationTypeId);
        $calculationType->fill($request->validated());

        $calculationType->save();

        return Redirect::route('calculationType.edit', $calculationTypeId);
    }

    public function destroy($calculationTypeId)
    {
        $calculationType = CalculationType::findOrFail($calculationTypeId);

        $calculationType->delete();

        return Redirect::route('calculationTypes.index');
    }
}
