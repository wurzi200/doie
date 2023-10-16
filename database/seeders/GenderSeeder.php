<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genders = [
            ['name' => 'Male', 'abbreviation' => 'M'],
            ['name' => 'Female', 'abbreviation' => 'F'],
            ['name' => 'Non-binary', 'abbreviation' => 'NB'],
            ['name' => 'Transgender', 'abbreviation' => 'T'],
            ['name' => 'Other', 'abbreviation' => 'O'],
        ];

        foreach ($genders as $gender) {
            Gender::firstOrCreate($gender);
        }
    }
}
