<?php

namespace App\Http\Controllers;

use App\Models\Roles;
use Hamcrest\Core\IsNot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RolesController extends Controller
{
    // public function index()
    // {
    //     $currentUser = auth()->user();
    //     $requiredLevel = PermissionsController::checkRequiredLevel('view_all_organizations');

    //     if ($requiredLevel) {
    //         $organizations = Roles::get();
    //     } else {
    //         $organizations = Roles::where('id',  $currentUser->organization_id)->get();
    //     }

    //     return Inertia::render('Organizations/ListView', [
    //         'organizations' => $organizations
    //     ]);
    // }

    static function getRoles()
    {
        $currentUser = auth()->user();
        $requiredLevel = PermissionsController::checkRequiredLevel('view_all_roles');

        if ($requiredLevel) {
            $roles = Roles::get();
        } else {
            $roles = Roles::where('level', '<=', $currentUser->role->level)->get();
        }

        return $roles;
    }
}
