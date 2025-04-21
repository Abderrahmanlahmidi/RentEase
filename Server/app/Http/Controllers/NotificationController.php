<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\Eloquent\NotificationRepository;
use Illuminate\Support\Facades\Validator;

class NotificationController extends Controller
{
    protected $notificationRepo;

    public function __construct(NotificationRepository $notificationRepo)
    {
        $this -> notificationRepo = $notificationRepo;
    }


    public function Notifications(){
        $notifications = $this->notificationRepo->all();
        return response()->json($notifications);
    }


    public function createNotification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'contenu' => 'required|string',
            'dateEnvoi' => 'required',
            'annonce_id' => 'required|exists:annonces,id',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $notification = $this->notificationRepo->create([
                'title' => $request->title,
                'contenu' => $request->contenu,
                'dateEnvoi' => $request->dateEnvoi,
                'annonce_id' => $request->annonce_id,
                'user_id' => $request->user_id,
            ]);

            if (!$notification) {
                return response()->json([
                    'status' => false,
                    'message' => 'Failed to create notification',
                ], 500);
            }

            $getNotification = $this->notificationRepo->find($notification->id);

            return response()->json([
                'status' => true,
                'message' => 'Notification created successfully',
                'notification' => $getNotification
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    public function deleteNotification($id){
         $notification = $this -> notificationRepo -> delete($id);

         if(!$notification){
            return response()->json([
                'message'=>"deleted failed",
            ], 400);
         }

         return response()->json([
            'message'=>"notification deleted successfully"
         ], 201);
    }


}
