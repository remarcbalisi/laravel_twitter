<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMockingConsoleOutput();
        $this->withoutExceptionHandling();
        $this->artisan('passport:install');
    }

    public function test_a_user_can_register()
    {
        $this->withoutExceptionHandling();
        $payload = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => $this->faker->password,
        ];

        $response = $this->postJson(route('register'), $payload);
        $response->assertJsonStructure([
            'data' => ['id']
        ]);
    }

    public function test_a_user_can_login()
    {
        $this->withoutExceptionHandling();
        $payload = [
            'email' => $this->user->email,
            'password' => 'password',
        ];
        $response = $this->postJson(route('login'), $payload);
        $response->assertJsonStructure([
            'data' => ['token', 'user']
        ]);
    }
}
