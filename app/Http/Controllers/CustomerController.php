<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
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

    public function create()
    {
        return Inertia::render('Customers/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $currentUser = auth()->user();

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,NULL,id,organization_id,' . $currentUser->organization_id,
            'number' => 'nullable|string|max:255',
        ]);

        $customer = new Customer();
        $customer->first_name = $validatedData['first_name'];
        $customer->last_name = $validatedData['last_name'];
        $customer->email = $validatedData['email'];
        $customer->number = $validatedData['number'];
        $customer->organization_id = $currentUser->organization_id;
        $customer->save();

        return Redirect::to('/customers');
    }

    public function edit(Request $request, $customerId)
    {
        $customer = Customer::where('id', $customerId)->first();

        if ($request->user()->organization_id != $customer->organization_id && !$request->user()->hasRole('super-admin-1')) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Customers/Edit', [
            'customer' => $customer
        ]);
    }

    public function update(Request $request, $customerId): RedirectResponse
    {
        $currentUser = auth()->user();

        $customer = Customer::findOrFail($customerId);

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('customers')->where(function ($query) use ($currentUser, $customer) {
                    return $query->where('organization_id', $currentUser->organization_id)
                        ->where('id', '<>', $customer->id);
                }),
            ],
            'number' => 'nullable|string|max:255',
        ]);

        $customer->first_name = $validatedData['first_name'];
        $customer->last_name = $validatedData['last_name'];
        $customer->email = $validatedData['email'];
        $customer->number = $validatedData['number'];
        $customer->save();

        return Redirect::route('customer.edit', $customerId);
    }

    public function destroy(Request $request, $customerId): RedirectResponse
    {

        $customer = Customer::findOrFail($customerId);

        if ($request->user()->organization_id != $customer->organization_id && !$request->user()->hasRole('super-admin-1')) {
            abort(403, 'Unauthorized action.');
        }

        $customer->delete();

        return Redirect::route('customers.index');
    }
}
