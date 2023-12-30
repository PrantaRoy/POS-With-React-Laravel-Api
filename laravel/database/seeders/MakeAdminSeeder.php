<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class MakeAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'name' => 'Super Admin',
            'email' => 'admin@site.com',
            'mobile' => '01773',
            'role_id' => 1,
            'password' => Hash::make(123456)
        ];

        User::create($data);
    }
}
