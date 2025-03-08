<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            "email" => "required|email|exists:users,email",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors(),
            ]);
        }

        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                "message" => "the email or password is incorrect"
            ], 404);
        }

        $token = $user->createToken($user->name . "Auth-Token")->plainTextToken;

        return response()->json([
            "message" => "login success",
            "token_type" => "Bearer",
            "token" => $token,
        ]);
    }

    public function register(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            "name" => "required|string",
            "email" => "required|string|email|max:255|unique:users",
            "password" => "required|string|min:6",
            "age" => "required|integer",
            "role_id" => "required|integer"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()->first(),
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'age' => $request->age,
            'role_id' => $request->role_id
        ]);

        if ($user) {
            $token = $user->createToken($user->name . "Auth-Token")->plainTextToken;

            return response()->json([
                "message" => "registration success",
                "token_type" => "Bearer",
                "token" => $token,
            ], 201);
        } else {
            return response()->json([
                "message" => "registration failed"
            ], 500);
        }
    }

    public function profile(Request $request): JsonResponse {
        if ($request->user()) {
            return response()->json([
                "message" => "profile success",
                "user" => $request->user()
            ]);
        }else{
            return response()->json([
                "message" => "user not found",
            ]);
        }
    }
    public function logout(Request $request): JsonResponse {
        $user = User::where("id", $request->user()->id)->first();
        if ($user) {
            $user->tokens()->delete();
            return response()->json([
                "message" => "logout success",
            ], 200);
        }else{
            return response()->json([
                "message" => "user not found",
            ], 404);
        }
    }


}
