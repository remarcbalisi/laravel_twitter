<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Tests\TestCase;

class FileUploadTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function test_file_can_be_uploaded()
    {
        Storage::fake('posts');
        $file_name = Str::uuid() . '-avatar.jpg';
        $file = UploadedFile::fake()->image($file_name);
        $payload = [
            'file' => $file,
        ];

        $response = $this->postJson(route('user.upload'), $payload);
        $path = json_decode($response->getContent());
        Storage::disk('public')->assertExists($path->data->path);
    }
}
