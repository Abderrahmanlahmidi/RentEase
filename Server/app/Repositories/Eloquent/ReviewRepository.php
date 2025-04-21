<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\ReviewRepositoryInterface;
use App\Models\Review;

class ReviewRepository implements ReviewRepositoryInterface
{
    public function all(){
        return Review::with('auteur')->get();
    }

    public function find($id){
        return Review::with('auteur')->find($id);
    }

    public function create(array $data){
        return Review::create($data);
    }

    public function update(array $data,$id){
        $review = review::find($id);
        $review->update($data);
        return $review;
    }

    public function delete($id){
        return Review::destroy($id);
    }

}
