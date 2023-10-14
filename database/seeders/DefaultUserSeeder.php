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
        $users = [
            [
                'name' => 'user',
                'lastname' => 'user',
                'email' => 'user@user.local',
                'email_verified_at' => now(),
                'organization_id' => 1,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
                'role' => 'user-1'
            ],
            [
                'name' => 'editor',
                'lastname' => 'editor',
                'email' => 'editor@editor.local',
                'email_verified_at' => now(),
                'organization_id' => 1,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
                'role' => 'editor-1'
            ],
            [
                'name' => 'admin',
                'lastname' => 'admin',
                'email' => 'admin@admin.local',
                'email_verified_at' => now(),
                'organization_id' => 1,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
                'role' => 'admin-1'
            ],
            [
                'name' => 'superadmin',
                'lastname' => 'superadmin',
                'email' => 'superadmin@superadmin.local',
                'email_verified_at' => now(),
                'organization_id' => 1,
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // hash for password "password"
                'role' => 'super-admin-1'
            ]
        ];

        foreach ($users as $user) {
            if (!User::where('email', $user['email'])->exists()) {
                $newUser = User::create($user);
                $newUser->assignRole($user['role']);
            }
        }
}
