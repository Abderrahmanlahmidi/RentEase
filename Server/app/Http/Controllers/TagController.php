<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\TagRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    protected $tagRepo;

    public function __construct(TagRepositoryInterface $tagRepo)
    {
        $this->tagRepo = $tagRepo;
    }

    public function createTag(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ]);
        }

        $this->tagRepo->create([
            'nom' => $request->nom,
            'description' => $request->description
        ]);

        return response()->json([
            "success" => true,
            "message" => "Tag created."
        ]);
    }

    public function displayTags()
    {
        $tags = $this->tagRepo->all();

        if ($tags->isEmpty()) {
            return response()->json([
                "success" => false,
                "message" => "Tags not found."
            ], 404);
        }

        return response()->json([
            "success" => true,
            "tags" => $tags
        ], 201);
    }

    public function deleteTag($id)
    {
        $this->tagRepo->delete($id);

        return response()->json([
            "success" => true,
            "message" => "Tag deleted."
        ]);
    }

    public function updateTag(Request $request, $id)
    {
        $tag = $this->tagRepo->find($id);

        $validator = Validator::make($request->all(), [
            'nom' => 'required',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                "success" => false,
                "message" => $validator->errors()
            ]);
        }

        $this->tagRepo->update($id, [
            'nom' => $request->nom,
            'description' => $request->description
        ]);

        return response()->json([
            "success" => true,
            'message' => "Tag updated."
        ]);
    }
}
