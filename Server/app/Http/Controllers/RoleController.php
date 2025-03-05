<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function index(){
        $roles = Role::all();

        return response()->json([
            'status' => 200,
            'roles' => $roles
        ]);
    }

    public function store(Request $request){

        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $role = Role::create($request->all());
        return response()->json([
            'status' => 200,
            'role' => $role
        ]);

    }

    public function show($id){
       $role = Role::find($id);
       if(!$role){
           return response()->json([
               'status' => 404,
               'message' => 'Role not found'
           ]);
       }
       return response()->json([
           'status' => 200,
           'role' => $role
       ]);
    }

    public function update(Request $request, $id)
    {

        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                'status' => 404,
                'message' => 'Role not found'
            ]);
        }
        $role->update($request->all());
        return response()->json([
            'status' => 200,
            'role' => $role
        ]);
    }

    public function destroy($id){
        $role = Role::find($id);
        if (!$role) {
            return response()->json([
                'status' => 404,
                'message' => 'Role not found'
            ]);
        }

        $role->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Role deleted successfully'
        ]);
    }

}
