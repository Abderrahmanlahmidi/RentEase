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
        'superficie',
        'coordonnees',
        'proprietaire_id',
        'category_id',
        'quartier_id',
        'prix',
        'transaction',
        'latitude',
        'longitude',
        'email',
        'telephone',
        'city',
    ];

    public function proprietaire()
    {
        return $this->belongsTo(User::class, 'proprietaire_id');
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function quartier()
    {
        return $this->belongsTo(Quartier::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function salles()
    {
        return $this->belongsToMany(Salle::class, 'annonce_salle');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'annonce_tag');
    }

}
