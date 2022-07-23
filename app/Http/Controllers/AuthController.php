<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request)
    {
        session(['user' => $request->input()]);
        return redirect()->route('dashboard');
    }

    public function destroy()
    {
        session()->flush();
        return redirect()->route('login');
    }
}
