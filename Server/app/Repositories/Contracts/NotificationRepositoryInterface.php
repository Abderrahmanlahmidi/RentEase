<?php

namespace App\Repositories\Contracts;

interface NotificationRepositoryInterface
{
    public function all();
    public function create(array $data);
    public function delete($id);
    public function find($id);
}
