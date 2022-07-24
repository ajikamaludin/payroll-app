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
}
