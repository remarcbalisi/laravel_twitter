<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function store(UserStoreRequest $request)
    {
        $user = User::create($request->all());
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $request->merge([
            'password' => Hash::make($request->password),
        ]);
        $user = tap($user)->update($request->except('role'));
        if($request->is('api/admin/user/*')){
            $user->syncRoles([Role::where('name', 'user')->first()]);
        }
        return new UserResource($user);
    }
}
