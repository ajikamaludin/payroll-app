<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GeneralController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    public function jabatan()
    {
        return Inertia::render('Jabatan/Index');
    }

    public function karyawan()
    {
        return Inertia::render('Karyawan/Index');
    }

    public function absensi()
    {
        return Inertia::render('Absensi/Index');
    }

    public function settingPotongGaji()
    {
        return Inertia::render('SettingPotongGaji/Index');
    }

    public function dataGaji()
    {
        return Inertia::render('Gaji/Index');
    }

    public function slipGaji()
    {
        return Inertia::render('Gaji/Slip');
    }

    public function userGaji()
    {
        return Inertia::render('Gaji/UserGaji');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'profile' => 'required|image'
        ]);

        $file = $request->file('profile');
        Storage::disk('public_pub')->put('image', $file);

        return response()->json(['file_name' => $file->hashName()]);
    }
}
