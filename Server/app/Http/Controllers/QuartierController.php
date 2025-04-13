<?php

namespace App\Http\Controllers;

use App\Models\Quartier;

class QuartierController extends Controller
{
    public function displayQuartiers(){
        $quartiers = Quartier::with('city')->get();

        if(!$quartiers){
          return response()->json([
              "success" => false,
              "message" => "Aucune quartier",
          ], 404);
        }

        return response()->json([
            "success" => true,
            "data" => $quartiers,
        ]);
    }
}
