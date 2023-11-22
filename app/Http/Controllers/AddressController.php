<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Customer;
use App\Models\ModelHasAddress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function create(Request $request, $id, $type)
    {
        $validatedData = $request->validate([
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'addressType' => 'required|string|max:255',
            'houseNumber' => 'required|string|max:255',
        ]);

        $address = new Address();
        $address->street = $validatedData['street'];
        $address->houseNumber = $validatedData['houseNumber'];
        $address->postal_code = $validatedData['postal_code'];
        $address->city = $validatedData['city'];
        $address->country = $validatedData['country'];
        $address->addressType = $validatedData['addressType'];
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
    }


    public function edit(Request $request, $addressId)
    {
        $address = Address::findOrFail($addressId);

        $validatedData = $request->validate([
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'addressType' => 'required|string|max:255',
            'houseNumber' => 'required|string|max:255',
        ]);

        $address->street = $validatedData['street'];
        $address->houseNumber = $validatedData['houseNumber'];
        $address->postal_code = $validatedData['postal_code'];
        $address->city = $validatedData['city'];
        $address->country = $validatedData['country'];
        $address->addressType = $validatedData['addressType'];
        $address->state = 'test';
        $address->save();

        return back();
    }

    public function delete($addressId)
    {
        $address = Address::findOrFail($addressId);

        $address->delete();

        return response()->json(['status' => 'success', 'message' => 'Address deleted successfully']);
    }
}
