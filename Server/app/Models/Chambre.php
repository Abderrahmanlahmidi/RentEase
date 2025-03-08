<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chambre extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_id',
        'aFenetre',
        'annonce_id'
    ];

    public function annonce(){
        return $this->belongsTo(Annonce::class);
    }

    public function type(){
        return $this->belongsTo(Type::class);
    }
}
