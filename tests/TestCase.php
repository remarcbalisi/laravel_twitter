<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Spatie\Permission\Models\Role;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public $adminRole;
    public $userRole;
    public $admin;
    public $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->adminRole = Role::create(['guard_name' => 'api', 'name' => 'admin']);
        $this->userRole = Role::create(['guard_name' => 'api', 'name' => 'user']);
        $this->admin = User::factory()->create([
            'email' => 'admin@email.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', //password
        ]);
        $this->user = User::factory()->create([
            'email' => 'user@email.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', //password
        ]);

        $this->admin->assignRole($this->adminRole);
        $this->user->assignRole($this->userRole);
    }
}
