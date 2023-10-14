<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\CalculationType;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // \App\Models\Todos::factory(10)->create();
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(DefaultUserSeeder::class);

        \App\Models\User::factory(10)->create();
        \App\Models\Organization::factory(10)->create();
        CalculationType::factory()->count(10)->create();

        $role = Role::where('name', 'super-admin-1')->first();
        $role->givePermissionTo(Permission::all());
    }
}
