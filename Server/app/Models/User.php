<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'profile_image',
        'password',
        'age',
        'role_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function annonces()
    {
        return $this->hasMany(Annonce::class, 'proprietaire_id');
    }

    public function Subscribes(){
        return $this->hasMany(Subscribe::class);
    }

    public function messagesSent()
    {
        return $this->hasMany(Message::class, 'expediteur_id');
    }

    public function messagesReceived()
    {
        return $this->hasMany(Message::class, 'destinataire_id');
    }

    public function visit(){
        return $this->hasMany(Visit::class);
    }





}
