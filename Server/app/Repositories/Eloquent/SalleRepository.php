<?php

namespace App\Repositories\Eloquent;

use App\Models\Salle;
use App\Models\Tag;
use App\Repositories\Contracts\SalleRepositoryInterface;

class SalleRepository implements SalleRepositoryInterface
{
    public function all(){
        return Salle::all();
    }

    public function find($id){
        return Salle::findOrFail($id);
    }

    public function create(array $data){
        return Salle::create($data);
    }

    public function update(array $data, $id){
        $salle = $this -> find($id);
        $salle -> update($data);
        return $salle;
    }

    public function delete($id){
        return Tag::destroy($id);
    }

}
