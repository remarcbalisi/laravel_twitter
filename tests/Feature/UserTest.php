<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\Passport;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;
    public $user2;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMockingConsoleOutput();
        $this->withoutExceptionHandling();
        $this->artisan('passport:install');

        $this->user2 = User::factory()->create([
            'email' => 'user2@email.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', //password
        ]);
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

    public function test_a_user_can_view_his_profile()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );

        $response = $this->getJson(route('user.user.show', ['user' => $this->user]));
        $response->assertJsonStructure([
            'data' => ['id', 'email']
        ]);
        $response->assertJsonFragment([
            'id' => $this->user->id,
        ]);
    }

    public function test_a_user_can_view_other_profile()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );

        $response = $this->getJson(route('user.user.show', ['user' => $this->user2]));
        $response->assertJsonStructure([
            'data' => ['id', 'email']
        ]);
        $response->assertJsonFragment([
            'id' => $this->user2->id,
        ]);
    }

    public function test_a_user_can_edit_his_profile()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );
        $payload = [
            'name' => $this->faker->name,
            'email' => $this->user->email,
            'password' => $this->faker->password,
        ];

        $response = $this->putJson(route('user.user.update', ['user' => $this->user]), $payload);
        $response->assertJsonStructure([
            'data' => ['id']
        ]);
    }
}
