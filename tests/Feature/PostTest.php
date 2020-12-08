<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\Passport;
use Tests\TestCase;

class PostTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;

    public function test_a_user_can_create_post()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );
        $payload = [
            'body' => $this->faker->paragraph,
        ];

        $response = $this->postJson(route('user.post.store'), $payload);
        $response->assertJsonStructure([
            'data' => ['id', 'user' => ['id']]
        ]);
    }
}
