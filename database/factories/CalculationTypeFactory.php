<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CalculationType>
 */
class CalculationTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization_id' => $this->faker->numberBetween(1, 10),
            'name' => $this->faker->word(),
            'minCost' => $this->faker->numberBetween(1000, 10000),
            'maxCost' => $this->faker->numberBetween(10000, 100000),
            'minSpecial' => $this->faker->numberBetween(100, 1000),
            'maxSpecial' => $this->faker->numberBetween(1000, 10000),
            'minResidual' => $this->faker->numberBetween(1000, 10000),
            'maxResidual' => $this->faker->numberBetween(10000, 100000),
            'minInterest' => $this->faker->randomFloat(2, 0, 10),
            'maxInterest' => $this->faker->randomFloat(2, 10, 20),
            'minDuration' => $this->faker->numberBetween(1, 12),
            'maxDuration' => $this->faker->numberBetween(12, 60),
            'type' => $this->faker->numberBetween(1, 2),
        ];
    }
}
