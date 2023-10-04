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
        Role::create(['name' => 'user', 'organization_id' => 1]);
        Role::create(['name' => 'editor', 'organization_id' => 1]);
        Role::create(['name' => 'admin', 'organization_id' => 1]);
        Role::create(['name' => 'super-admin', 'organization_id' => 1]);
    }
}
