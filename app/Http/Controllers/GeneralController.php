<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}
