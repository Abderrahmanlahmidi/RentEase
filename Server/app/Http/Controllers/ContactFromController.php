<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class ContactFromController extends Controller
{
    //
    public function sendMail(Request $request)
    {
        try {
            $validated = $request->validate([
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required',
                'message' => 'required'
            ]);

            Mail::raw("
                 You have received a new contact message:
                 Name: {$validated['firstName']} {$validated['lastName']}
                 Email: {$validated['email']}
                 Message:
                 {$validated['message']}
                 Regards,
                 RentEase Website",
                function ($message) use ($validated) {
                $message->to("dvabderrahmane@gmail.com")->subject("New Email From {$validated['firstName']} {$validated['lastName']}");
            });
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        return response()->json([
            'message' => 'Email sent'
        ]);
    }
}
