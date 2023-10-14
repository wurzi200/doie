<?php

namespace App\Http\Controllers;

use App\Models\Calculation;
use Cknow\Money\Money;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class CalculationController extends Controller
{

    function getCalculationValues($cost, $interest, $duration, $special, $residual)
    {
        $curreny = 'EUR';
        $netValue = money(money_parse_by_decimal($cost, $curreny))->subtract(money(money_parse_by_decimal($special, $curreny)))->getAmount();
        $interestRate = ($interest / 100) / 12;
        $monthlyInterestRate = 1 + $interestRate;
        $netResidualValue =  money(money_parse_by_decimal($residual, $curreny))->divide(pow($monthlyInterestRate, $duration))->getAmount();
        $annuityFactorInArrears = ((pow($monthlyInterestRate, $duration)) * $interestRate) / ((pow($monthlyInterestRate, $duration)) - 1);
        $annuityFactorInAdvance = $annuityFactorInArrears / $monthlyInterestRate;

        $calculationValues = [
            'netValue' => $netValue,
            'interestRate' => $interestRate,
            'monthlyInterestRate' => $monthlyInterestRate,
            'netResidualValue' => $netResidualValue,
            'annuityFactorInArrears' => $annuityFactorInArrears,
            'annuityFactorInAdvance' => $annuityFactorInAdvance
        ];

        return $calculationValues;
    }

    function calculateMonthlyPayment($calculationValues, $type)
    {
        $netValue = $calculationValues['netValue'];
        $netResidualValue = $calculationValues['netResidualValue'];
        $annuityFactorInArrears = $calculationValues['annuityFactorInArrears'];
        $monthlyInterestRate = $calculationValues['monthlyInterestRate'];

        $rateInArrears = (money($netValue)->subtract(money($netResidualValue)))->multiply($annuityFactorInArrears)->getAmount();
        $rateInAdvance = money($rateInArrears)->divide($monthlyInterestRate)->getAmount();


        if ($type == 1) {
            return $rateInAdvance;
        }
        return $rateInArrears;
    }

    public function calculate(Request $request)
    {
        $curreny = 'EUR';
        $cost = $request->cost;

        $duration = $request->duration;
        $interest = $request->interest;
        $residual = $request->residual;
        $special = $request->special;
        $type = $request->type;
        $rate = 0;

        $calcValues = $this->getCalculationValues($cost, $interest, $duration, $special, $residual);

        $rate = $this->calculateMonthlyPayment($calcValues, $type);

        return money($rate, $curreny)->format();
    }

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

    public function store(Request $request)
    {
        // $request->user()->fill($request->validated());
        $currentUser = auth()->user();

        $calculation = Calculation::create([
            'user_id' => $currentUser->id,
            'organization_id' => $currentUser->organization_id,
            'cost' => $request->cost,
            'duration' => $request->duration,
            'interest' => $request->interest,
            'residual' => $request->residual,
            'special' => $request->special,
            'type' => $request->type,
            'rate' => $request->rate,
        ]);
        return Redirect::route('calculation.create', $calculation);
    }
}
