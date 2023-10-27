<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Customer;
use App\Models\ModelHasAddress;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Address::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customer = Customer::factory()->create();

        $address = [
            'type' => $this->faker->randomElement(['Home', 'Work', 'Other']),
            'street' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'state' => $this->faker->stateAbbr,
            'postal_code' => $this->faker->postcode,
            'country' => $this->faker->country,
        ];

        $addressModel = Address::create($address);

        $modelHasAddress = new ModelHasAddress();
        $modelHasAddress->address_id = $addressModel->id;
        $modelHasAddress->model_type = 'App\Models\Customer';
        $modelHasAddress->model_id = $customer->id;
        $modelHasAddress->save();

        return $address;
    }
}
