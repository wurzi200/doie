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
        Permission::create(['name' => 'edit_user']);
        Permission::create(['name' => 'edit_organization']);
        Permission::create(['name' => 'edit_role']);
        Permission::create(['name' => 'edit_permission']);
    }
}
