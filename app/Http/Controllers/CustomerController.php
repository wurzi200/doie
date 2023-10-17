<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();

        $customers = Customer::where('organization_id', $currentUser->organization_id)->with('addresses')->paginate(10)->withQueryString();

        return Inertia::render('Customers/ListView', [
            'customers' => $customers
        ]);
    }
}
