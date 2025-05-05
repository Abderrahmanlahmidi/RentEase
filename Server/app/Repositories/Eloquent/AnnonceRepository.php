<?php
namespace App\Repositories\Eloquent;

use App\Models\Annonce;
use App\Models\Image;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Repositories\Contracts\AnnonceRepositoryInterface;

class AnnonceRepository implements AnnonceRepositoryInterface
{
    public function createAnnonce(array $data)
    {
        DB::beginTransaction();

        try {
            $annonce = Annonce::create($data['annonce_fields']);

            $annonce->tags()->sync($data['tag_id']);
            $annonce->salles()->sync($data['salle_id']);

            if (!empty($data['image_files'])) {
                foreach ($data['image_files'] as $file) {
                    $path = $file->store('annonces', 'public');
                    Image::create([
                        'annonce_id' => $annonce->id,
                        'url' => $path,
                    ]);
                }
            }

            DB::commit();

            return Annonce::with(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images'])->find($annonce->id);

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getAllAnnonces()
    {
        return Annonce::with(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images'])->get();
    }

    public function findAnnonceById($id)
    {
        return Annonce::with(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images'])->find($id);
    }

    public function updateAnnonce($id, array $data)
    {
        $annonce = Annonce::findOrFail($id);

        $annonce->update($data['annonce_fields']);
        $annonce->tags()->sync($data['tag_id']);
        $annonce->salles()->sync($data['salle_id']);

        foreach ($annonce->images as $image) {
            if (Storage::exists($image->path)) {
                Storage::delete($image->path);
            }
            $image->delete();
        }

        if (!empty($data['image_files'])) {
            foreach ($data['image_files'] as $file) {
                $path = $file->store('annonces', 'public');
                $annonce->images()->create(['url' => $path]);
            }
        }

        return $annonce->load(['category', 'quartier', 'proprietaire', 'salles', 'tags', 'images']);
    }

    public function deleteAnnonce($id)
    {
        DB::beginTransaction();

        try {
            DB::table('annonce_tag')->where('annonce_id', $id)->delete();
            Annonce::destroy($id);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
