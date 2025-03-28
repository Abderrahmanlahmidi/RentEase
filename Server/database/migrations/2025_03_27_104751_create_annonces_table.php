<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('annonces', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->float('superficie');
            $table->string('coordonnees');
            $table->foreignId('proprietaire_id')->constrained('users');
            $table->foreignId('client_id')->nullable()->constrained('users');
            $table->foreignId('category_id')->constrained('categories');
            $table->foreignId('quartier_id')->constrained('quartiers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('annonces');
    }
};
