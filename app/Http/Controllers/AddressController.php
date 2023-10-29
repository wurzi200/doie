<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Customer;
use App\Models\ModelHasAddress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AddressController extends Controller
{
    public function create(Request $request, $id, $type)
    {
        $validatedData = $request->validate([
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $address = new Address();
        $address->street = $validatedData['street'];
        $address->postal_code = $validatedData['postal_code'];
        $address->city = $validatedData['city'];
        $address->country = $validatedData['country'];
        $address->type = 'test';
        $address->state = 'test';
        $address->save();

        $modelHasAddress = new ModelHasAddress();
        $modelHasAddress->address_id = $address->id;

        if ($type == 'customer') {
            $modelHasAddress->model_type = 'App\Models\Customer';
        } else if ($type == 'organization') {
            $modelHasAddress->model_type = 'App\Models\Organization';
        }

        $modelHasAddress->model_id = $id;
        $modelHasAddress->save();

        return redirect()->back();
    }


    public function edit(Request $request, $addressId): RedirectResponse
    {
        $address = Address::findOrFail($addressId);

        $validatedData = $request->validate([
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
        ]);

        $address->street = $validatedData['street'];
        $address->postal_code = $validatedData['postal_code'];
        $address->city = $validatedData['city'];
        $address->country = $validatedData['country'];
        $address->type = 'test';
        $address->state = 'test';
        $address->save();

        return redirect()->back();
    }

    public function delete($addressId): RedirectResponse
    {
        $address = Address::findOrFail($addressId);

        $address->delete();

        return redirect()->back();
    }
}
