<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function store(UserStoreRequest $request)
    {
        $user = User::create($request->all());
        return new UserResource($user);
    }
}
