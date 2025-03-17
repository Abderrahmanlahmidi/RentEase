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

        $user = User::with('role')->where('email', $request->email)->first();

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
            'user' => $user,
//            "password" => $user->password,
        ]);
    }

    public function register(Request $request): JsonResponse {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'age' => 'required|integer|min:18',
            'email' => 'required|email|unique:users,email',
            'profile_image' => 'required',
            'password' => 'required',
            'role_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => $validator->errors()->first(),
            ]);
        }

        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'profile_image' => $request->profile_image,
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
            ], 201);
        }else{
            return response()->json([
                "message" => "user not found",
            ], 404);
        }
    }

    public function index(){
        $users = User::with("role")->get();
        return response()->json([
            "users" => $users
        ]);
    }

   public function show(int $id): JsonResponse {
        $user = User::find($id);
        if ($user) {
            return response()->json([
                "user" => $user,
                "password" => $user->password,
            ], 201);
        }else{
            return response()->json([
                "message" => "user not found",
            ], 500);
        }
   }
    public function update(Request $request, $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            "firstName" => "required|string",
            "lastName" => "required|string",
            "age" => "required|integer|min:18",
            "email" => "required|email|unique:users,email," . $id,
            "profile_image" => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user->firstName = $request->firstName;
        $user->lastName = $request->lastName;
        $user->age = $request->age;
        $user->email = $request->email;
        $user->profile_image = $request->profile_image;

        $user->save();

        $userData = User::with('role')->where('email', $request->email)->first();

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $userData,
        ], 201);
    }

}

