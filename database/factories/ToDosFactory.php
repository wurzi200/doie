<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\todos>
 */
class ToDosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 2,
            'description' => Arr::random(['Joe', 'Mama', 'Macht', 'Wilde', 'Dinge']),
            'priority' => rand(1, 3),
            'status' => Arr::random(['done', 'open']),
        ];
    }
}
