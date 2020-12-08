<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(Post::latest()->paginate());
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function store(PostStoreRequest  $request)
    {
        $request->merge([
            'user_id' => Auth::user()->id,
        ]);
        $post = Post::create($request->all());
        return new PostResource($post);
    }
}
