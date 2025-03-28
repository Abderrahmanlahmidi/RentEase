<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CategorieController extends Controller
{

    public function displayCategories(){

        $categories = Category::all();

        if(!$categories){
            return response()->json([
                "success" => false,
                "message" => "No categories found."
            ]);
        }


        return response()->json([
            "success" => true,
            "categories" => $categories
        ]);
    }

    public function deleteCategory($id){
        Category::destroy($id);
        return response()->json([
            "success" => true,
            "message" => "Category deleted."
        ]);
    }

    public function createCategory(Request $request){
        $validator = Validator::make($request->all(), [
            'nom' => 'required',
            'description' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ]);
        }

        Category::create([
            "nom" => $request->nom,
            "description" => $request->description
        ]);

        return response()->json([
            "success" => true,
            "message" => "Category created."
        ]);
    }

}




