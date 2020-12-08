<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentStoreRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(CommentStoreRequest $request)
    {
        $request->merge([
            'user_id' => Auth::user()->id,
        ]);
        $comment = Comment::create($request->all());
        return new CommentResource($comment);
    }
}
