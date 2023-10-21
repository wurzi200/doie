<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Customer;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AddressController extends Controller
{
    public function create(Request $request, $customerId)
    {
        $customer = Customer::findOrFail($customerId);

        $validatedData = $request->validate([
            'street' => 'required|string|max:255',
            'postal_code' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $address = new Address();
        $address->street = $validatedData['street'];
        $address->postal_code = $validatedData['postal_code'];
        $address->city = $validatedData['city'];
        $address->country = $validatedData['country'];
        $address->customer_id = $customer->id;
        $address->type = 'test';
        $address->state = 'test';
        $address->save();

        return Redirect::route('customer.edit', $customerId);
    }

    public function edit(Request $request, $addressId)
    {
        $address = Address::findOrFail($addressId);

        $validatedData = $request->validate([
            'street' => 'required|string|max:255',
            'postal' => 'nullable|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $address->update($validatedData);
    }

    public function delete($addressId): RedirectResponse
    {
        $address = Address::findOrFail($addressId);

        $customerId = $address->customer->id;

        $address->delete();

        return Redirect::route('customer.edit', $customerId);
    }
}
