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
        Role::create(['name' => 'user', 'guard_name' => 'user']);
        Role::create(['name' => 'editor', 'guard_name' => 'editor']);
        Role::create(['name' => 'admin', 'guard_name' => 'admin']);
        Role::create(['name' => 'super-admin', 'guard_name' => 'super-admin']);
    }
}
