<?php
namespace App\Repositories\Contracts;

interface AnnonceRepositoryInterface
{
    public function createAnnonce(array $data);
    public function getAllAnnonces();
    public function findAnnonceById($id);
    public function updateAnnonce($id, array $data);
    public function deleteAnnonce($id);
}
