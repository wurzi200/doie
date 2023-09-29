<?php

namespace App\Http\Controllers;

use App\Models\Permissions;

class PermissionsController extends Controller
{
    static function checkRequiredLevel($permissonName)
    {
        $currentUser = auth()->user();
        $requiredLevel = Permissions::where('name', $permissonName)->value('required_level');

        if ($currentUser->role->level < $requiredLevel) {
            return true;
        } else {
            return false;
        }
    }
}
