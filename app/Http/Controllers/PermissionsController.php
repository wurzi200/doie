<?php

namespace App\Http\Controllers;

use App\Models\Permissions;

use function PHPUnit\Framework\isNull;

class PermissionsController extends Controller
{
    static function checkRequiredLevel($permissonName)
    {
        $currentUser = auth()->user();
        $requiredLevel = Permissions::where('name', $permissonName)->value('required_level');

        if ($requiredLevel) {
            if ($currentUser->role->level < $requiredLevel) {
                return false;
            } else {
                return true;
            }
        }
    }
}
