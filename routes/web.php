<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GeneralController;
use App\Http\Middleware\IsGuest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\IsSessionAuth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route("login");
});

Route::middleware([IsGuest::class])->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware([IsSessionAuth::class])->group(function () {
    Route::get('/dashboard', [GeneralController::class, 'dashboard'])->name('dashboard');
    Route::get('/jabatan', [GeneralController::class, 'jabatan'])->name('jabatan');
    Route::get('/karyawan', [GeneralController::class, 'karyawan'])->name('karyawan');
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
});
