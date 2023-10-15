<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            ['name' => 'show_users'],
            ['name' => 'create_users'],
            ['name' => 'edit_users'],
            ['name' => 'show_organizations'],
            ['name' => 'edit_organizations'],
            ['name' => 'show_roles'],
            ['name' => 'create_roles'],
            ['name' => 'edit_roles'],
            ['name' => 'show_calculation_types'],
            ['name' => 'create_calculation_types'],
            ['name' => 'edit_calculation_types'],
            ['name' => 'delete_calculation_types'],
            ['name' => 'show_calculations'],
            ['name' => 'create_calculations'],
            ['name' => 'delete_calculations'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate($permission);
        }
    }
}
