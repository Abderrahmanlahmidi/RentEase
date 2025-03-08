<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annonce extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'prix',
        'localisation',
        'proprietaire_id',
        'estDisponible',
        'superficie',
        'coordonnees'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'proprietaire_id');
    }

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function chambres(){
        return $this->hasMany(Chambre::class);
    }
}
