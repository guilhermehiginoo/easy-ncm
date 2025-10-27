<?php

use App\Http\Controllers\VectorController;
use Illuminate\Support\Facades\Route;

Route::middleware('api.token')->group(function () {
    Route::post('/vectorize-ncm', [VectorController::class, 'vectorizeNcm']);
});
