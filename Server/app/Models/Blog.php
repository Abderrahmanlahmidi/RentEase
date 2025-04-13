<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'contenu', 'datePublication', 'auteur_id'];

    public function auteur()
    {
        return $this->belongsTo(User::class, 'auteur_id');
    }

}
