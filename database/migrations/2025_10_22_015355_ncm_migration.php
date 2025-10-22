<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('ncm_codes', function (Blueprint $table) {
            $table->id();
            $table->string('ncm_code', 30)->unique();
            $table->string('description')->nullable();
            $table->enum('embedding_status', ['pending', 'processing', 'done', 'error'])->default('pending');
            $table->text('embedding_error')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::table('ncm_codes', function (Blueprint $table) {
            Schema::dropIfExists('ncm_codes');
        });
    }
};
