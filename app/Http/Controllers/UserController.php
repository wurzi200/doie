<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderByDesc('role_id')->get();

        return Inertia::render('Users/ListView', [
            'users' => $users
        ]);
    }
}
