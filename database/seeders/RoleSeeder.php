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
        $roles = [
            ['name' => 'newuser-0', 'organization_id' => 0, 'display_name' => 'newuser'],
            ['name' => 'user-1', 'organization_id' => 1, 'display_name' => 'user'],
            ['name' => 'editor-1', 'organization_id' => 1, 'display_name' => 'editor'],
            ['name' => 'admin-1', 'organization_id' => 1, 'display_name' => 'admin'],
            ['name' => 'super-admin-1', 'organization_id' => 1, 'display_name' => 'super-admin'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate($role);
        }
    }
}
