<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Eloquent\TagRepository;
use App\Repositories\Eloquent\SalleRepository;
use App\Repositories\Contracts\SalleRepositoryInterface;

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
