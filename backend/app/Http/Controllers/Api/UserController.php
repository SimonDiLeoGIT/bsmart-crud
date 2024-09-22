<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Utils\ResponseHandler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    protected $responseHandler;

    public function __construct(ResponseHandler $responseHandler)
    {
        $this->responseHandler = $responseHandler;
    }

    public function register(Request $request)
    {
        $existingUser = User::first();

        if ($existingUser) {
            return $this->responseHandler->formatErrorResponse('Forbiden', 'There is already a registered user.', 403);
        }

        try {   
            $validated = $request->validate([
                'name' => 'required|string|max:30|min:3',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8|confirmed',
            ]);
        } catch (ValidationException $e) {
            return $this->responseHandler->formatValidationErrorResponse($e);
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $accessToken = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $accessToken], 201);
    }
    
    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return $this->responseHandler->formatValidationErrorResponse($e);
        }

        if (!Auth::attempt($validated)) {
            return $this->responseHandler->formatErrorResponse('Unprocessable Entity', 'Email and Password do not match.', 422);
        }

        $user = Auth::user();
        $accessToken = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $accessToken], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}