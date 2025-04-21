<?php

namespace App\Repositories\Eloquent;

use App\Models\Notification;
use App\Repositories\Contracts\NotificationRepositoryInterface;

class NotificationRepository implements NotificationRepositoryInterface
{
    public function all(){
        return Notification::get();
    }

    public function create(array $data){
        return Notification::create($data);
    }

    public function delete($id){
        return Notification::destroy($id);
    }

    public function find($id){
        return Notification::with('annonce', 'user')->find($id);
    }

}
