<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\VisitRepositoryInterface;
use Illuminate\Http\Request;


class VisitController extends Controller
{
    protected $visitRepo;

    public function __construct(VisitRepositoryInterface $visitRepo)
    {
        $this->visitRepo = $visitRepo;
    }

    public function index()
    {
        return response()->json([
            'status' => true,
            'visits' => $this->visitRepo->all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'annonce_id' => 'required|exists:annonces,id',
            'date_visite' => 'required|date',
        ]);

        $visit = $this->visitRepo->create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Visit created successfully',
            'visit' => $visit,
        ], 201);
    }

    public function show($id)
    {
        $visit = $this->visitRepo->find($id);

        return response()->json([
            'status' => true,
            'visit' => $visit,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'date_visite' => 'sometimes|required|date',
            'annonce_id' => 'sometimes|required|exists:annonces,id',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        $visit = $this->visitRepo->update($id, $validated);

        return response()->json([
            'status' => true,
            'message' => 'Visit updated successfully',
            'visit' => $visit,
        ]);
    }

    public function destroy($id)
    {
        $this->visitRepo->delete($id);

        return response()->json([
            'status' => true,
            'message' => 'Visit deleted successfully',
        ]);
    }

    public function getVisitsByOwner($ownerId)
    {
        $visits = $this->visitRepo->getVisitsForOwner($ownerId);

        return response()->json([
            'status' => true,
            'visits' => $visits,
        ]);
    }

    public function updateStatus($id, Request $request){

        $validated = $request->validate([
            'status' => 'required',
        ]);

        $this->visitRepo->changeStatus($id, ['status' => $validated['status']]);

        return response()->json([
            'status' => true,
            'message' => 'Visit updated successfully',
        ], 201);
    }
}
