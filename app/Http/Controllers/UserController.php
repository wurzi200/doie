<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $currentUser = $request->user();
        if ($currentUser->role_id < 999) {
            $users = User::where('organization_id',  $currentUser->organization_id)->with('organization')->orderByDesc('role_id')->get();
        } else {
            $users = User::with('organization')->orderByDesc('role_id')->get();
        }


        return Inertia::render('Users/ListView', [
            'users' => $users
        ]);
    }
}
