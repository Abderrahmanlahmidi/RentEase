<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\SalleRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SalleController extends Controller
{

  protected $salleRepo;

  public function __construct(SalleRepositoryInterface $salleRepo){
      $this->salleRepo = $salleRepo;
  }

  public function displaySalles(){
        $salles = $this -> salleRepo -> all();

        if($salles -> isEmpty() ){
            return response() -> json([
                "success" => false,
                "message" => "Salles not found"
            ], 404);
        }

        return response() -> json([
            "success" => true,
            "salles" => $salles
        ]);
  }


  public function createSalle(Request $request){
      $validator = Validator::make($request->all(), [
          'type' => "required",
          "description" => "required",
      ]);


      if($validator->fails()){
          return response() -> json([
              "success" => false,
              "message" => $validator->errors()
          ]);
      }

      $this -> salleRepo -> create([
          "type" => $request -> type,
          "description" => $request -> description,
      ]);

      return response() -> json([
          "success" => true,
          "message" => "Salle created"
      ]);

  }

  public function deleteSalle($id){
      $this -> salleRepo -> delete($id);
      return response() -> json([
          "success" => true,
          "message" => "Salle deleted"
      ]);
  }

  public function updateSalle(Request $request, $id){
      $salle = $this -> salleRepo -> find($id);

      $validator = Validator::make($request->all(), [
          'type' => "required",
          "description" => "required",
      ]);

      if($validator->fails()){
          return response() -> json([
              "success" => false,
              "message" => $validator->errors()
          ]);
      }

      $this -> salleRepo -> update([
          'type' => $request->type,
          'description' => $request -> description
      ], $id);

      return response() -> json([
          "success" => true,
          "message" => "Salle updated"
      ]);
  }


}
