<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function displayBlogs(){
        $blogs = Blog::with('auteur')->get();

        if(!$blogs){
            return response()->json([
                "success" => false,
                "message" => "No blogs found."
            ]);
        }

        return response()->json([
            "success" => true,
            "blogs" => $blogs
        ]);
    }

    public function createBlog(Request $request){
        $validator = Validator::make($request->all(), [
            'titre' => 'required',
            'contenu' => 'required',
            'datePublication' => 'required',
            'auteur_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

       $blog = Blog::create([
            'titre' => $request->titre,
            'contenu' => $request->contenu,
            'datePublication' => $request->datePublication,
            'auteur_id' => $request->auteur_id
        ]);

        $review = Blog::with('auteur')->find($blog->id);

        return response()->json([
            "success" => true,
            "message" => "Blog created.",
            "review" => $review
        ], 201);
    }

    public function updateBlog(Request $request, $id){

        $blog = Blog::find($id);

        $validator = Validator::make($request->all(), [
            'titre' => 'required',
            'contenu' => 'required',
            'datePublication' => 'required',
            'auteur_id' => 'required',
        ]);

        if(!$blog){
            return response()->json([
                "success" => false,
                "message" => "Blog not found."
            ]);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

       $blog->titre = $request->titre;
       $blog->contenu = $request->contenu;
       $blog->datePublication = $request->datePublication;
       $blog->auteur_id = $request->auteur_id;
        $blog->save();

        return response()->json([
            "success" => true,
            'message' => "Blog updated."
        ], 201);

    }

    public function deleteBlog($id){
       $blog =  Blog::destroy($id);

       if(!$blog){
           return response()->json([
               "success" => false,
               "message" => "Blog not found."
           ]);
       }

        return response()->json([
            "success" => true,
            "message" => "Blog deleted."
        ]);
    }

}
