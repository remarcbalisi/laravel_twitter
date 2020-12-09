<?php

namespace Tests\Feature;

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Passport\Passport;
use Tests\TestCase;

class PostTest extends TestCase
{
    use WithFaker;
    use RefreshDatabase;
    public $post;
    public $user2;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user2 = User::factory()->create([
            'email' => 'user2@email.com',
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', //password
        ]);
        $this->post = Post::factory()->create([
            'user_id' => $this->user2->id
        ]);
    }

    public function test_a_user_can_create_post()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );
        $payload = [
            'body' => $this->faker->paragraph,
            'images' => '[]',
        ];

        $response = $this->postJson(route('user.post.store'), $payload);
        $response->assertJsonStructure([
            'data' => ['id', 'user' => ['id']]
        ]);
    }

    public function test_a_user_can_comment_to_a_post()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );
        $payload = [
            'content' => $this->faker->sentence,
            'post_id' => $this->post->id,
        ];
        $response = $this->postJson(route('user.comment.store'), $payload);
        $response->assertJsonStructure([
            'data' => ['id', 'post' => ['id']]
        ]);
    }

    public function test_a_user_can_view_posts()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );
        $response = $this->getJson(route('user.post.index'));
        $response->assertJsonStructure([
            'data' => [['id']]
        ]);
    }

    public function test_a_user_can_view_single_posts()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );
        $response = $this->getJson(route('user.post.show', ['post' => $this->post]));
        $response->assertJsonStructure([
            'data' => ['id']
        ]);
    }

    public function test_a_user_can_re_post()
    {
        $this->withoutExceptionHandling();
        Passport::actingAs(
            $this->user
        );
        $payload = [
            'body' => mb_strimwidth($this->faker->paragraph, 0, 219),
            'post_id' => $this->post->id,
            'images' => '[]',
        ];

        $response = $this->postJson(route('user.post.store'), $payload);
        $response->assertJsonStructure([
            'data' => ['id', 'user' => ['id'], 'post_urls' => [['id']]]
        ]);
    }
}
