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
        Schema::table('annonces', function (Blueprint $table) {
            $table->decimal('prix', 10, 2)->after('id');
            $table->decimal('latitude', 10, 8)->nullable()->after('prix');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->string('transaction')->after('longitude');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('annonces', function (Blueprint $table) {
            $table->dropColumn(['prix', 'latitude', 'longitude', 'transaction']);
        });
    }
};
