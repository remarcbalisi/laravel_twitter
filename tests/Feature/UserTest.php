<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

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
}
