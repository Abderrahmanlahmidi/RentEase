<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'contenu', 'lu', 'date_envoi'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
