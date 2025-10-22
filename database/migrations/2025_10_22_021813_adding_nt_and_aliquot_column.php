<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ncm_codes', function (Blueprint $table) {
            $table->boolean('NT')->nullable()->comment('This column is used to determine whether or not tax is paid. If set to true, the tax rate will always be zero.');
            $table->float('aliquot')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ncm_codes', function (Blueprint $table) {
            //
        });
    }
};
