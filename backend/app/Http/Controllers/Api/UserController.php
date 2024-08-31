<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facade\Hash;
use Illuminate\Support\Facade\Auth;

class UserController extends Controller
{

    public function register(Request $request)
    {
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $accessToken = $user->createToken('Personal Access Token')->plainTextToken;

        // Auth::login($user);

        return response()->json(['user' => $user, 'token' => $accessToken], 200);
    }
    
    public function login(Request $request)
    {
        if(!Auth::attempt($request->only('email', 'password'))){
            return response()->json(['message' => 'Email or Password Invalid'], 404);
        }

        $user = Auth::user();
        $accessToken = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $accessToken], 200);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully'], 204);
    }

    public function index()
    {
    
    }


    public function store(Request $request)
    {
    
    }

    public function show(string $id)
    {
        
    }

    public function update(Request $request, string $id)
    {
        
    }

    public function destroy(string $id)
    {
    }
}
