<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('ncm_codes', function (Blueprint $table) {
            $table->dropUnique('ncm_codes_ncm_code_unique');
            $table->string('ex', 10)->nullable()->after('ncm_code');
            $table->unique(['ncm_code', 'ex'], 'unique_ncm_ex');
            $table->text('description')->change();
        });
    }

    public function down(): void
    {
        Schema::table('ncm_codes', function (Blueprint $table) {
            $table->dropUnique('unique_ncm_ex');
            $table->dropColumn('ex');
            $table->unique('ncm_code', 'ncm_codes_ncm_code_unique');
        });
    }
};
