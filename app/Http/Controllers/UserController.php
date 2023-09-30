<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $currentUser = auth()->user();
        $requiredLevel = PermissionsController::checkRequiredLevel('view_all_users');

        if ($requiredLevel) {
            $users = User::with('organization')->with('role')->orderByDesc('role_id')->get();
        } else {
            $users = User::where('organization_id',  $currentUser->organization_id)->with('organization')->with('role')->orderByDesc('role_id')->get();
        }

        return Inertia::render('Users/ListView', [
            'users' => $users
        ]);
    }

    public function edit()
    {
    }
}
