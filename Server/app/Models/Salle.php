<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;

    protected $fillable = ['type'];

    public function annonces()
    {
        return $this->belongsToMany(Annonce::class, 'annonce_salle');
    }

}
