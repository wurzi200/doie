<?php

namespace App\Http\Controllers;

use App\Models\Calculation;
use App\Models\CalculationType;
use Cknow\Money\Money;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class CalculationController extends Controller
{
    private $currency = 'EUR';

    private function validateRequestAgainstCalculationType(Request $request, CalculationType $calculationType)
    {
        $rules = [
            'cost' => 'required|numeric|min:' . $calculationType->minCost . '|max:' . $calculationType->maxCost,
            'duration' => 'required|numeric|min:' . $calculationType->minDuration . '|max:' . $calculationType->maxDuration,
            'interest' => 'required|numeric|min:' . $calculationType->minInterest . '|max:' . $calculationType->maxInterest,
            'residual' => 'required|numeric|min:' . $calculationType->minResidual . '|max:' . $calculationType->maxResidual,
            'special' => 'required|numeric|min:' . $calculationType->minSpecial . '|max:' . $calculationType->maxSpecial,
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    function getCalculationValues($cost, $interest, $duration, $special, $residual)
    {
        $netValue = money($cost)->subtract(money($special))->getAmount();
        $interestRate = ($interest / 100) / 12;
        $monthlyInterestRate = 1 + $interestRate;
        $netResidualValue =  money($residual)->divide(pow($monthlyInterestRate, $duration))->getAmount();
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

        $rateInArrears = money($netValue)->subtract(money($netResidualValue))->multiply($annuityFactorInArrears)->getAmount();
        $rateInAdvance = money($rateInArrears)->divide($monthlyInterestRate)->getAmount();

        if ($type == 1) {
            return $rateInAdvance;
        }
        return $rateInArrears;
    }

    public function calculate(Request $request)
    {
        $cost = money_parse_by_decimal($request->cost, $this->currency);

        $duration = $request->duration;
        $interest = $request->interest;
        $residual = money_parse_by_decimal($request->residual, $this->currency);
        $special = money_parse_by_decimal($request->special, $this->currency);
        $rate = 0;

        $calculationType = CalculationType::find($request->calculationType);
        $type = $calculationType->type;

        $this->validateRequestAgainstCalculationType($request, $calculationType);


        $calcValues = $this->getCalculationValues($cost, $interest, $duration, $special, $residual);

        $rate = $this->calculateMonthlyPayment($calcValues, $type);

        return money($rate, $this->currency)->format();
    }

    public function create()
    {
        $currentUser = auth()->user();

        $roles = Role::where('organization_id', $currentUser->organization_id)->get();
        $organizations = OrganizationController::getOrganizations();
        $calculationTypes = CalculationType::where('organization_id', $currentUser->organization_id)->get();

        return Inertia::render('Calculator/Calculation/Create', [
            'organizations' => $organizations,
            'roles' => $roles,
            'user' => $currentUser,
            'calculationTypes' => $calculationTypes,
        ]);
    }

    public function store(Request $request)
    {
        $calculationType = CalculationType::find($request->calculationType);
        $this->validateRequestAgainstCalculationType($request, $calculationType);
        $currentUser = auth()->user();

        $calculation = Calculation::create([
            'user_id' => $currentUser->id,
            'organization_id' => $currentUser->organization_id,
            'cost' => money_parse_by_decimal($request->cost, $this->currency)->getAmount(),
            'duration' => $request->duration,
            'interest' => $request->interest,
            'residual' => money_parse_by_decimal($request->residual, $this->currency)->getAmount(),
            'special' => money_parse_by_decimal($request->special, $this->currency)->getAmount(),
            'calculationType' => $request->calculationType,
            'rate' => money($request->rate, $this->currency)->getAmount(),
        ]);
        return Redirect::route('calculation.create', $calculation);
    }

    public function index()
    {
        $currentUser = auth()->user();

        $calculations = Calculation::where('organization_id', $currentUser->organization_id)->with(['user', 'calculationType'])->paginate(10);

        return Inertia::render('Calculator/Calculation/ListView', [
            'calculations' => $calculations,
        ]);
    }

    public function destroy(Request $request, $calculationId)
    {
        $calculation = Calculation::find($calculationId);

        if ($request->user()->organization_id != $calculation->organization_id && !$request->user()->hasRole('super-admin-1')) {
            abort(403, 'Unauthorized action.');
        }

        $calculation->delete();

        return Redirect::route('calculations.index', $calculation);
    }
}
