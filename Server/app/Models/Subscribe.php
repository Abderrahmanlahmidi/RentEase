<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MongoDB\Driver\Monitoring\Subscriber;

class Subscribe extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'date',
        'subscriber_id',
    ];

    public function subscriber(){
        return $this->belongsTo(User::class);
    }
}
