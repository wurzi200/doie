<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Gender;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = auth()->user();

        $query = Customer::where('organization_id', $currentUser->organization_id)->with(['addresses', 'gender']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', '%' . $search . '%')
                    ->orWhere('last_name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('number', 'like', '%' . $search . '%')
                    ->orWhereHas('gender', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%');
                    });
            });
        }

        $customers = $query->paginate(10)->withQueryString();

        return Inertia::render('Customers/ListView', [
            'customers' => $customers
        ]);
    }

    public function create()
    {
        $genders = Gender::get();

        return Inertia::render('Customers/Create', [
            'genders' => $genders,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $currentUser = auth()->user();

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,NULL,id,organization_id,' . $currentUser->organization_id,
            'number' => 'nullable|string|max:255',
            'gender' => 'required'

        ]);

        $customer = new Customer();
        $customer->first_name = $validatedData['first_name'];
        $customer->last_name = $validatedData['last_name'];
        $customer->email = $validatedData['email'];
        $customer->number = $validatedData['number'];
        $customer->organization_id = $currentUser->organization_id;
        $customer->gender_id = $validatedData['gender'];

        $customer->save();

        return Redirect::route('customer.edit', $customer->id);
    }

    public function edit(Request $request, $customerId)
    {
        $customer = Customer::where('id', $customerId)->with('addresses')->first();
        $genders = Gender::get();

        if ($request->user()->organization_id != $customer->organization_id && !$request->user()->hasRole('super-admin-1')) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
            'genders' => $genders,
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
            'gender' => 'required'
        ]);

        $customer->first_name = $validatedData['first_name'];
        $customer->last_name = $validatedData['last_name'];
        $customer->email = $validatedData['email'];
        $customer->number = $validatedData['number'];
        $customer->gender_id = $validatedData['gender'];
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
