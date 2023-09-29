<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Permissions;
use App\Models\Roles;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //\App\Models\User::factory(10)->create();
        //\App\Models\Organization::factory(10)->create();

        // \App\Models\Todos::factory(10)->create();
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);


        // RE enable once project is finished or new migration happens
        // Roles::insert([
        //     'id' => 1,
        //     'level' => 10,
        //     'name' => 'user',
        // ]);

        // Roles::insert([
        //     'id' => 2,
        //     'level' => 100,
        //     'name' => 'editor',
        // ]);

        // Roles::insert([
        //     'id' => 3,
        //     'level' => 1000,
        //     'name' => 'admin',
        // ]);

        // Roles::insert([
        //     'id' => 4,
        //     'level' => 9999,
        //     'name' => 'superadmin',
        // ]);

        // Permissions::insert([
        //     'id' => 1,
        //     'required_level' => 9000,
        //     'name' => 'view_all_users',
        // ]);

        // Permissions::insert([
        //     'id' => 2,
        //     'required_level' => 9000,
        //     'name' => 'view_all_organizations',
        // ]);
    }
}
