<?php

namespace App\Providers;

use App\Repositories\Contracts\VisitRepositoryInterface;
use App\Repositories\Eloquent\VisitRepository;
use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Eloquent\TagRepository;
use App\Repositories\Eloquent\SalleRepository;
use App\Repositories\Contracts\SalleRepositoryInterface;
use App\Repositories\Eloquent\ReviewRepository;
use  App\Repositories\Contracts\ReviewRepositoryInterface;
use App\Repositories\Contracts\AnnonceRepositoryInterface;
use App\Repositories\Eloquent\AnnonceRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TagRepositoryInterface::class, TagRepository::class);
        $this->app->bind(SalleRepositoryInterface::class, SalleRepository::class);
        $this->app->bind(ReviewRepositoryInterface::class, ReviewRepository::class);
        $this->app->bind(VisitRepositoryInterface::class, VisitRepository::class);
        $this->app->bind(AnnonceRepositoryInterface::class, AnnonceRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
