<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'annonce_id',
        'date_visite',
        'status',
    ];


    public function visiteur()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function annonce()
    {
        return $this->belongsTo(Annonce::class);
    }
}
