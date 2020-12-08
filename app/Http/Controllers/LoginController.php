<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\RequestTokenResource;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $token = Auth::user()->createToken('token-name')->accessToken;;
            return new RequestTokenResource( (object) ['token' => $token, 'user' => Auth::user()]);
        }
        abort(401);
    }
}
