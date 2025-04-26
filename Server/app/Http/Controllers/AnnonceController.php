<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\Annonce;
use App\Models\Image;
use Illuminate\Support\Facades\DB;

class AnnonceController extends Controller
{

    public function createAnnonce(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "titre" => "required|string|max:255",
            "description" => "required|string",
            "latitude" => "required|string",
            "longitude" => "required|string",
            "category_id" => "required|exists:categories,id",
            "email" => "required|email",
            "telephone" => "required",
            "transaction" => "required|in:location,achat",
            "prix" => "required|numeric|min:1",
            "quartier_id" => "required|exists:quartiers,id",
            "salle_id" => "required|array",
            "salle_id.*" => "exists:salles,id",
            "superficie" => "required|numeric|min:1",
            "tag_id" => "required|array",
            "tag_id.*" => "exists:tags,id",
            "image_files" => "required",
            "image_files.*" => "required",
            "city" => "required|string",
            'proprietaire_id' => 'required',
            'numberRooms' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $annonce = Annonce::create([
            "titre" => $request->titre,
            "description" => $request->description,
            "latitude" => $request->latitude,
            "longitude" => $request->longitude,
            "category_id" => $request->category_id,
            "email" => $request->email,
            "telephone" => $request->telephone,
            "transaction" => $request->transaction,
            "prix" => $request->prix,
            "quartier_id" => $request->quartier_id,
            "superficie" => $request->superficie,
            "proprietaire_id" => $request->proprietaire_id,
            "numberRooms" => $request->numberRooms
        ]);

        $annonce->tags()->sync($request->tag_id);
        $annonce->salles()->sync($request->salle_id);

        if($request->hasFile('image_files')){
            foreach ($request->file('image_files') as $file) {
                $path = $file->store('annonces', 'public');
                Image::create([
                    'annonce_id' => $annonce->id,
                    'url' => $path,
                ]);
            }
        }

        $newAnnonce = Annonce::with(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images'])->find($annonce->id);
        return response()->json([
            'message' => 'Annonce créée avec succès!',
            'annonce' => $newAnnonce,
        ], 201);
    }


    public function deleteAnnonce($id)
    {
        DB::beginTransaction();

        try {
            DB::table('annonce_tag')->where('annonce_id', $id)->delete();

            Annonce::destroy($id);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Annonce deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete annonce',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAllAnnonces()
    {
        $annonces = Annonce::with(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images'])->get();

        return response()->json([
            'success' => true,
            'annonces' => $annonces
        ], 201);
    }

    public function findAnnonceById($id){
        $annonce = Annonce::with(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images'])->find($id);

        if(!$annonce){
            return response()->json([
                "success" => false,
                "message" => "Annonce not found"
            ]);
        }

        return response()->json([
            "success" => true,
            "annonce" => $annonce
        ]);
    }

    public function updateAnnonce(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "titre" => "required|string|max:255",
            "description" => "required|string",
            "latitude" => "required|string",
            "longitude" => "required|string",
            "category_id" => "required|exists:categories,id",
            "email" => "required|email",
            "telephone" => "required",
            "transaction" => "required|in:location,achat",
            "prix" => "required|numeric|min:1",
            "quartier_id" => "required|exists:quartiers,id",
            "salle_id" => "required|array",
            "salle_id.*" => "exists:salles,id",
            "superficie" => "required|numeric|min:1",
            "tag_id" => "required|array",
            "tag_id.*" => "exists:tags,id",
            "image_files" => "required|min:1",
            "image_files.*" => "required|image",
            "city" => "required|string",
            "proprietaire_id" => "required|exists:users,id",
            "numberRooms" => "required|numeric|min:1",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 402);
        }

        $annonce = Annonce::with(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images'])->find($id);

        if (!$annonce) {
            return response()->json(['message' => 'Annonce not found'], 404);
        }

        $annonce->update([
            'titre' => $request->titre,
            'description' => $request->description,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'category_id' => $request->category_id,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'transaction' => $request->transaction,
            'prix' => $request->prix,
            'quartier_id' => $request->quartier_id,
            'superficie' => $request->superficie,
            'city' => $request->city,
            'proprietaire_id' => $request->proprietaire_id,
            'numberRooms' => $request->numberRooms
        ]);

        $annonce->salles()->sync($request->salle_id);
        $annonce->tags()->sync($request->tag_id);

        foreach ($annonce->images as $image) {
            if (\Storage::exists($image->path)) {
                \Storage::delete($image->path);
            }
            $image->delete();
        }

        foreach ($request->file('image_files') as $imageFile) {
            $path = $imageFile->store('annonces', 'public');
            $annonce->images()->create(['path' => $path]);
        }

        return response()->json([
            'message' => 'Annonce updated successfully',
            'annonce' => $annonce->load(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images']),
        ]);
    }


}


