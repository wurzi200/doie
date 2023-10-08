<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Exceptions\UnauthorizedException;

class UserHasPermission
{
  public function handle($request, Closure $next, $permission, $guard = null)
  {
    $authGuard = Auth::guard($guard);

    if ($authGuard->guest()) {
      throw UnauthorizedException::notLoggedIn();
    }

    $user = User::where('id', $authGuard->user()->id)->first();

    $permissions = $user->getPermissionsViaRoles()->toArray();
    $permissionFlatten = Arr::flatten($permissions);

    if (!in_array($permission, $permissionFlatten)) {
      throw UnauthorizedException::forPermissions($permissions);
    }

    return $next($request);
  }
}
