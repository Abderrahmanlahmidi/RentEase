<?php

namespace App\Repositories\Eloquent;

use App\Models\Visit;
use App\Repositories\Contracts\VisitRepositoryInterface;

class VisitRepository implements VisitRepositoryInterface
{

    public function all()
    {
        return Visit::with(['visiteur', 'annonce'])->latest()->get();
    }

    public function find($id)
    {
        return Visit::with(['user', 'annonce'])->findOrFail($id);
    }

    public function create(array $data)
    {
        return Visit::create($data);
    }

    public function update($id, array $data)
    {
        $visit = Visit::findOrFail($id);
        $visit->update($data);
        return $visit;
    }

    public function delete($id)
    {
        $visit = Visit::findOrFail($id);
        return $visit->delete();
    }

    public function getVisitsForOwner($ownerId)
    {
        return Visit::whereHas('annonce', function ($query) use ($ownerId) {
            $query->where('user_id', $ownerId);
        })->with(['visiteur', 'annonce'])->latest()->get();
    }

    public function changeStatus($id, array $data){
        $visit = Visit::findOrFail($id);
        $visit->update(['status' => $data['status']]);
        return $visit;

    }



}
