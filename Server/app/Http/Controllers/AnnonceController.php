<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Repositories\Contracts\AnnonceRepositoryInterface;

class AnnonceController extends Controller
{
    protected $annonceRepo;

    public function __construct(AnnonceRepositoryInterface $annonceRepo)
    {
        $this->annonceRepo = $annonceRepo;
    }

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
            'proprietaire_id' => 'required',
            'numberRooms' => 'required',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = [
            'annonce_fields' => $request->only([
                "titre", "description", "latitude", "longitude", "category_id",
                "email", "telephone", "transaction", "prix", "quartier_id",
                "superficie", "proprietaire_id", "numberRooms"
            ]),
            'tag_id' => $request->tag_id,
            'salle_id' => $request->salle_id,
            'image_files' => $request->file('image_files', []),
        ];

        $annonce = $this->annonceRepo->createAnnonce($data);

        return response()->json([
            'message' => 'Annonce créée avec succès!',
            'annonce' => $annonce,
        ], 201);
    }

    public function getAllAnnonces()
    {
        $annonces = $this->annonceRepo->getAllAnnonces();

        return response()->json([
            'success' => true,
            'annonces' => $annonces,
        ], 201);
    }

    public function findAnnonceById($id)
    {
        $annonce = $this->annonceRepo->findAnnonceById($id);

        if (!$annonce) {
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
            "latitude" => "required|numeric",
            "longitude" => "required|numeric",
            "category_id" => "required|exists:categories,id",
            "email" => "required|email",
            "telephone" => "required|string|max:20",
            "transaction" => "required",
            "prix" => "required|numeric",
            "quartier_id" => "required|exists:quartiers,id",
            "superficie" => "required|numeric",
            "proprietaire_id" => "required|exists:users,id",
            "numberRooms" => "required|integer|min:1",
            "city" => "required|string|max:255",
            "tag_id" => "required|array",
            "tag_id.*" => "exists:tags,id",
            "salle_id" => "required|array",
            "salle_id.*" => "exists:salles,id",
            "image_files" => "sometimes|array",
            "image_files.*" => "image",
        ]);


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = [
            'annonce_fields' => $request->only([
                "titre", "description", "latitude", "longitude", "category_id",
                "email", "telephone", "transaction", "prix", "quartier_id",
                "superficie", "proprietaire_id", "numberRooms", "city"
            ]),
            'tag_id' => $request->tag_id,
            'salle_id' => $request->salle_id,
            'image_files' => $request->file('image_files', []),
        ];

        $annonce = $this->annonceRepo->updateAnnonce($id, $data);

        return response()->json([
            'message' => 'Annonce updated successfully',
            'annonce' => $annonce,
        ]);
    }

    public function deleteAnnonce($id)
    {
        $this->annonceRepo->deleteAnnonce($id);

        return response()->json([
            'success' => true,
            'message' => 'Annonce deleted successfully',
        ]);
    }
}
