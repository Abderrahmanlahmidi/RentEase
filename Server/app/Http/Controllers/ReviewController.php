<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Repositories\Contracts\ReviewRepositoryInterface;

class ReviewController extends Controller
{
    protected $reviewRepo;

    public function __construct(ReviewRepositoryInterface $reviewRepo){
        $this->reviewRepo = $reviewRepo;
    }
    public function displayReviews(){
        $reviews = $this->reviewRepo->all();

        if(!$reviews){
            return response()->json([
                "success" => false,
                "message" => "No reviews found."
            ]);
        }

        return response()->json([
            "success" => true,
            "reviews" => $reviews
        ]);
    }

    public function createReview(Request $request){

        $validator = Validator::make($request->all(), [
            'titre' => 'required',
            'contenu' => 'required',
            'datePublication' => 'required',
            'auteur_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

       $review = $this->reviewRepo->create([
            'titre' => $request->titre,
            'contenu' => $request->contenu,
            'datePublication' => $request->datePublication,
            'auteur_id' => $request->auteur_id
        ]);

        $review = $this->reviewRepo->find($review->id);

        return response()->json([
            "success" => true,
            "message" => "Review created.",
            "review" => $review
        ], 201);
    }

    public function updateReview(Request $request, $id){

        $review = $this->reviewRepo->find($id);

        $validator = Validator::make($request->all(), [
            'titre' => 'required',
            'contenu' => 'required',
            'datePublication' => 'required',
            'auteur_id' => 'required',
        ]);

        if(!$review){
            return response()->json([
                "success" => false,
                "message" => "Review not found."
            ]);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

       $this->reviewRepo->update([
           'titre' => $request->titre,
           'contenu' => $request->contenu,
           'datePublication' => $request->datePublication,
           'auteur_id' => $request->auteur_id
       ], $id);

        $this->reviewRepo->find($id);

        return response()->json([
            "success" => true,
            'message' => "Review updated."
        ], 201);

    }

    public function deleteReview($id){
       $review = $this -> reviewRepo->delete($id);

       if(!$review){
           return response()->json([
               "success" => false,
               "message" => "Review not found."
           ]);
       }

        return response()->json([
            "success" => true,
            "message" => "Review deleted."
        ]);
    }

}
