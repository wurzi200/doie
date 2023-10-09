<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'newuser', 'organization_id' => null, 'display_name' => 'newuser']);
        Role::create(['name' => 'user-1', 'organization_id' => 1, 'display_name' => 'user']);
        Role::create(['name' => 'editor-1', 'organization_id' => 1, 'display_name' => 'editor']);
        Role::create(['name' => 'admin-1', 'organization_id' => 1, 'display_name' => 'admin']);
        Role::create(['name' => 'super-admin-1', 'organization_id' => 1, 'display_name' => 'super-admin']);
    }
}
