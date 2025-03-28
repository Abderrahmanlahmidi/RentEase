<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoleController extends Controller
{

    public function displayRoles(){

        $roles = Role::get();

        if(!$roles){
            return response()->json([
                "success" => false,
                "message" => "No roles found."
            ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $roles
        ]);
    }

    public function createRole(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ]);
        }

        Role::create([
            'name' => $request-> name,
            'description' => $request -> description
        ]);

        return response()->json([
            "success" => true,
            "message" => "Role created."
        ]);
    }

    public function updateRole(Request $request, $id)
    {
        $role = Role::find($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ]);
        }

        $role-> name = $request->name;
        $role -> description = $request->description;
        $role -> save();

        return response()->json([
            "success" => true,
            "message" => "Role updated."

        ],201);
    }

    public function deleteRole($id){
        Role::destroy($id);
        return response()->json([
            "success" => true,
            "message" => "Role deleted."
        ]);
    }


}
