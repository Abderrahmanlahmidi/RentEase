<?php

namespace App\Http\Controllers;


use App\Models\Subscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;


class SubscribeController extends Controller
{
    //
    public function createSubscribe(Request $request){

        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'date' => 'required',
            'subscriber_id' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        Mail::raw("🎉 Thank you for subscribing to our newsletter! You'll now receive the latest updates and offers from RentEase. 🏡", function($message) use($request){
            $message->to($request->email)
                ->subject('Welcome to the RentEase Newsletter');
        });
        
        Subscribe::create([
             'email' => $request->email,
             'date' => $request->date,
             'subscriber_id' => $request->subscriber_id
         ]);

        return response()->json(['message' => 'Subscribed successfully'], 201);
    }


}
