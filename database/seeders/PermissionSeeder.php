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
        Permission::create(['name' => 'show_users']);
        Permission::create(['name' => 'create_users']);
        Permission::create(['name' => 'edit_users']);

        Permission::create(['name' => 'show_organizations']);
        Permission::create(['name' => 'edit_organizations']);

        Permission::create(['name' => 'show_roles']);
        Permission::create(['name' => 'create_roles']);
        Permission::create(['name' => 'edit_roles']);
    }
}
