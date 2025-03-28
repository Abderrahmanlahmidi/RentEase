<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quartier extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'city_id'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function annonces()
    {
        return $this->hasMany(Annonce::class);
    }
}
