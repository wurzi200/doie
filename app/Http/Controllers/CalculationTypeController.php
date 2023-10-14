<?php

namespace App\Http\Controllers;

use App\Models\CalculationType;
use Illuminate\Http\Request;
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
}
