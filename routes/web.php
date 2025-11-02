<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect('/classificar');
    }

    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Rotas de classificação NCM
    Route::get('/classificar', [App\Http\Controllers\ClassifyController::class, 'index'])->name('classify.index');
    Route::post('/classificar', [App\Http\Controllers\ClassifyController::class, 'classify'])->name('classify.store');

    // Rotas de histórico
    Route::get('/historico', [App\Http\Controllers\HistoryController::class, 'index'])->name('history.index');
    Route::get('/historico/{id}', [App\Http\Controllers\HistoryController::class, 'show'])->name('history.show');
});

require __DIR__ . '/auth.php';
