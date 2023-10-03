<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'user',
            'lastname' => 'user',
            'email' => 'user@user.local',
            'email_verified_at' => now(),
            'organization_id' => 1,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
        ])->assignRole('user');

        $user = User::create([
            'name' => 'editor',
            'lastname' => 'editor',
            'email' => 'editor@editor.local',
            'email_verified_at' => now(),
            'organization_id' => 1,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
        ])->assignRole('editor');

        $user = User::create([
            'name' => 'admin',
            'lastname' => 'admin',
            'email' => 'admin@admin.local',
            'email_verified_at' => now(),
            'organization_id' => 1,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
        ])->assignRole('admin');

        $user = User::create([
            'name' => 'superadmin',
            'lastname' => 'superadmin',
            'email' => 'superadmin@superadmin.local',
            'email_verified_at' => now(),
            'organization_id' => 1,
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
        ])->assignRole('super-admin');
    }
}
